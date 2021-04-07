import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton, makeStyles, Button, Typography } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import NextIcon from '@material-ui/icons/NavigateNext';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import gfm from 'remark-gfm';
import WhoAmIModal from './WhoAmIModal';
import NavDrawer from '../../UI/NavDrawer';
import { toData } from '../../../helpers';
import { resolveImg } from '../../../resources/images';
import { useFlatUnlockedItems } from '../../../hooks/items';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  homePage: PropTypes.string,
  whiteList: PropTypes.string,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func
};

const defaultProps = {
  homePage: 'home',
  whiteList: 'none',
  whoAmI: null,
  setWhoAmI: () => {}
};

const remarkPlugins = [gfm];

const drawerWidth = 260;

SyntaxHighlighter.registerLanguage('javascript', js);

const PagesInterface = ({
  width,
  pages,
  homePage,
  whiteList,
  useCustomAppBar,
  whoAmI,
  setWhoAmI,
  accounts
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [page, setPage] = useState(homePage);
  const [child, setChild] = useState(whoAmI);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  // Set page from url params.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPage = params.get('page');
    if (newPage) setPage(newPage);
  }, [location.search]);

  // Subscribe to child updates.
  useEffect(() => whoAmI?.ref.onSnapshot(childDoc => setChild(toData(childDoc))), [whoAmI]);

  // Customize AppBar.
  useEffect(
    () =>
      useCustomAppBar(
        page,
        <>
          {child !== null && (
            <Tooltip title="Change Profile" placement="bottom">
              <Button onClick={() => setShowProfile(true)} className={classes.profButton}>
                {child.fName}
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Pages Menu" placement="bottom">
            <IconButton
              color="inherit"
              aria-label="showMenu drawer"
              edge="end"
              onClick={() => setShowMenu(!showMenu)}
              className={clsx(showMenu && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </>,
        clsx(classes.appBar, {
          [classes.appBarShift]: showMenu
        })
      ),
    [page, showMenu, classes, child]
  );

  const setUrlPage = p => history.push(`?page=${p}`);

  return (
    <div className={classes.wrapper}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: showMenu
        })}
      >
        <Markdown pages={pages} page={page} />
        <NavButtons
          onNav={setUrlPage}
          current={page}
          items={pages}
          locked={child !== null}
          whiteList={child !== null ? child[whiteList] : []}
        />
      </main>
      <NavDrawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        current={page}
        items={pages}
        onNav={
          isWidthDown('sm', width)
            ? p => {
                setUrlPage(p);
                setShowMenu(false);
              }
            : setUrlPage
        }
        width={drawerWidth}
        locked={child !== null}
        whiteList={child !== null ? child[whiteList] : []}
      />
      <WhoAmIModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        accounts={accounts}
        setWhoAmI={setWhoAmI}
      />
    </div>
  );
};

PagesInterface.propTypes = propTypes;
PagesInterface.defaultProps = defaultProps;

const PageLink = ({ type, href, children }) => {
  const pref = l => l.pathname.split('/')[1];
  const page = t => href.replace(t, '').replace(/\//g, '.');
  const clean = p => (p[p.length - 1] === '.' ? p.slice(0, p.length - 1) : p);
  return (
    <Link
      to={location => ({
        pathname: `/${pref(location)}/${type}`,
        search: `?page=${clean(page('/' + type + '/'))}`
      })}
    >
      {children}
    </Link>
  );
};
PageLink.propTypes = {
  type: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const COMMANDS = {
  // fileName works on the first line only.
  fileName: '// File: ',
  startRemove: '/*{*/',
  endRemove: '/*}*/',
  // Use replace to abbreviate back to back endRemove and startAdd.
  replace: '/*}[*/',
  startAdd: '/*[*/',
  endAdd: '/*]*/'
};

const CodeBlock = ({ code, lang }) => {
  const classes = useStyles();
  const [cleanCode, setCleanCode] = useState('');
  const defaultTitle = 'Code Block';
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    let currentCode = code;
    const cmds = COMMANDS;
    // Handle fileName comment.
    const firstLine = currentCode.split('\n')[0];
    const hasFileName = firstLine.startsWith(cmds.fileName);
    const fileName = firstLine.replace(cmds.fileName, '');
    if (hasFileName) {
      setTitle(fileName);
      currentCode = removeFirstLine(currentCode);
    } else setTitle(defaultTitle);
    // Handle replace, remove, add comments.
    const idxs = {
      sr: code.indexOf(cmds.startRemove),
      er: code.indexOf(cmds.endRemove),
      re: code.indexOf(cmds.replace),
      sa: code.indexOf(cmds.startAdd),
      ea: code.indexOf(cmds.endAdd)
    };
    let insertIndex = -1;
    let newCode = '';
    let oldCode = '';
    if (idxs.sr !== -1 && idxs.re !== -1 && idxs.ea !== -1) {
      // Replace Case
      const [before, next] = currentCode.split(cmds.startRemove);
      const [cd, after] = next.split(cmds.endAdd);
      const [oc, nc] = cd.split(cmds.replace);
      currentCode = before + after;
      insertIndex = before.length;
      oldCode = oc;
      newCode = nc;
    } else if (idxs.sr !== -1 && idxs.er !== -1) {
      // Remove Case
      const [before, next] = currentCode.split(cmds.startRemove);
      const [oc, after] = next.split(cmds.endRemove);
      currentCode = before + after;
      insertIndex = idxs.sr;
      oldCode = oc;
    } else if (idxs.sa !== -1 && idxs.ea !== -1) {
      // Add Case
      const [before, next] = currentCode.split(cmds.startAdd);
      const [nc, after] = next.split(cmds.endAdd);
      currentCode = before + after;
      insertIndex = idxs.sa;
      newCode = nc;
    } else {
      setCleanCode(currentCode);
    }
    console.log(insertIndex);
    if (insertIndex !== -1) animateCode(currentCode, insertIndex, oldCode, newCode);
  }, [code]);

  const animateCode = (
    currentCode,
    insertIndex,
    oldCode,
    newCode,
    oldIndex = -1,
    newIndex = -1
  ) => {
    const before = currentCode.substr(0, insertIndex);
    const after = currentCode.substr(insertIndex, currentCode.length);
    const speed = 100;
    if (oldCode !== '') {
      const oi = oldIndex === -1 ? oldCode.length : oldIndex;
      setCleanCode(before + oldCode.slice(0, oi) + after);
      if (oi - 1 < 0)
        setTimeout(() => animateCode(currentCode, insertIndex, '', newCode, -1, newIndex), speed);
      else
        setTimeout(
          () => animateCode(currentCode, insertIndex, oldCode, newCode, oi - 1, newIndex),
          speed
        );
    } else if (newCode !== '') {
      const ni = newIndex === -1 ? 0 : newIndex;
      setCleanCode(before + newCode.slice(0, ni) + after);
      if (ni + 1 > newCode.length)
        setTimeout(() => animateCode(currentCode, insertIndex, oldCode, '', oldIndex, -1), speed);
      else
        setTimeout(
          () => animateCode(currentCode, insertIndex, oldCode, newCode, oldIndex, ni + 1),
          speed
        );
    }
  };

  const removeFirstLine = c =>
    c
      .split('\n')
      .slice(1, c.length - 1)
      .join('\n');

  const highlight = c => (
    <SyntaxHighlighter
      language={lang || 'javascript'}
      style={atomDark}
      customStyle={{
        borderRadius: '0',
        margin: 0,
        padding: '0 12px',
        tabSize: '2'
      }}
    >
      {c}
    </SyntaxHighlighter>
  );

  return (
    <div className={classes.codeBlock}>
      <div className={classes.codeBlockHeader}>
        <Typography
          variant="body1"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {title !== defaultTitle && <FolderIcon style={{ marginRight: 12 }} />}
          {title}
        </Typography>
        <CopyToClipboard text={code}>
          <Button startIcon={<CopyIcon />}>Copy Code</Button>
        </CopyToClipboard>
      </div>
      <div className={classes.codeBlockText}>{highlight(cleanCode)}</div>
    </div>
  );
};
CodeBlock.propTypes = {
  code: PropTypes.node.isRequired,
  lang: PropTypes.string
};
CodeBlock.defaultProps = { lang: 'javascript' };

const Markdown = ({ pages, page }) => {
  const classes = useStyles();
  const [content, setContent] = useState('# Hello World');

  // Fetch page content.
  useEffect(() => {
    setContent('');
    window.scrollTo(0, 0);
    const controller = new AbortController();
    let doc = pages;
    page.split('.').forEach(stop => {
      doc = doc[stop];
    });
    fetch(doc, { signal: controller.signal })
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(err => {
        if (!(err instanceof DOMException)) console.error(err);
      });
    return () => controller.abort();
  }, [page]);

  const fromInclude = value =>
    value
      .replace('{% include ', '')
      .replace('.md %}', '')
      .replace(/\//g, '.');

  /* eslint-disable */
  const mdRenderers = {
    heading: ({ level, children }) => <Typography variant={`h${level}`}>{children}</Typography>,
    text: ({ value }) => {
      if (value.startsWith('{% include') && value.endsWith('%}'))
        return <Markdown page={fromInclude(value)} pages={pages} />;
      return value;
    },
    code: ({ value, language }) => <CodeBlock code={value} lang={language} />,
    paragraph: ({ children }) => <div className={classes.p}>{children}</div>,
    image: ({ src, alt }) => {
      if (src.startsWith('/images/')) return <img src={resolveImg(src)} alt={alt} />;
      return <img src={src} alt={alt} />;
    },
    link: ({ href, target, children }) => {
      if (href.startsWith('/docs/'))
        return (
          <PageLink type="docs" href={href}>
            {children}
          </PageLink>
        );
      if (href.startsWith('/tutorials/'))
        return (
          <PageLink type="tutorials" href={href}>
            {children}
          </PageLink>
        );
      return (
        <a href={href} target={target} rel="noopener norefferer">
          {children}
        </a>
      );
    }
  };
  /* eslint-enable */

  return (
    <ReactMarkdown
      allowDangerousHtml
      linkTarget="_blank"
      plugins={remarkPlugins}
      renderers={mdRenderers}
    >
      {content}
    </ReactMarkdown>
  );
};
Markdown.propTypes = {
  pages: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired
};

const NavButtons = ({ current, items, locked, whiteList, onNav }) => {
  const flatUnlocks = useFlatUnlockedItems(items, locked, whiteList);

  const nextPage = useMemo(() => {
    const i = flatUnlocks.indexOf(current);
    return i < flatUnlocks.length - 1 ? flatUnlocks[i + 1] : '';
  }, [current, flatUnlocks]);

  const prevPage = useMemo(() => {
    const i = flatUnlocks.indexOf(current);
    return i > 0 ? flatUnlocks[i - 1] : '';
  }, [current, flatUnlocks]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 16
      }}
    >
      <Button
        variant="outlined"
        onClick={() => onNav(prevPage)}
        disabled={prevPage === ''}
        startIcon={<PrevIcon />}
      >
        Prev
      </Button>
      <Button
        variant="outlined"
        onClick={() => onNav(nextPage)}
        disabled={nextPage === ''}
        endIcon={<NextIcon />}
      >
        Next
      </Button>
    </div>
  );
};
NavButtons.propTypes = {
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  locked: PropTypes.bool,
  whiteList: PropTypes.arrayOf(PropTypes.string)
};
NavButtons.defaultProps = {
  locked: false,
  whiteList: []
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start'
    }
  },
  appBar: {
    backgroundColor: 'var(--background-color)',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  content: {
    width: '100%',
    maxWidth: 940,
    [theme.breakpoints.down('md')]: {
      maxWidth: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%'
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: 0,
    padding: '20px 12px',
    boxSizing: 'border-box',
    '& a': {
      color: 'var(--pink-color)'
    },
    '& code': {
      color: 'var(--yellow-color)',
      fontSize: '120%',
      fontWeight: 600
    },
    '& h1,h2,h3,h4,h5,h6': {
      margin: '12px 0'
    },
    '& h1': { fontSize: '4rem', color: 'var(--blue-color)' },
    '& h2': { fontSize: '3rem' },
    '& h3': { fontSize: '2.5rem' },
    '& h4': { fontSize: '2rem' },
    '& h5': { fontSize: '1.8rem' },
    '& h6': { fontSize: '1.5rem' }
  },
  p: {
    fontSize: '1.2rem',
    margin: '16px 0'
  },
  codeBlock: {
    padding: '12px 0',
    '& code': { fontSize: '100%' }
  },
  codeBlockHeader: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '0.3em 0.3em 0 0',
    backgroundColor: 'rgb(29, 31, 33)',
    marginTop: 12,
    padding: '6px 18px',
    borderBottom: 'solid rgba(255, 255, 255, 0.1) 2px'
  },
  codeBlockText: {
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '12px 0',
    backgroundColor: 'rgb(29, 31, 33)',
    borderRadius: '0 0 0.3em 0.3em'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  profButton: {
    marginRight: 20,
    padding: '6px 16px'
  }
}));

export default withWidth()(PagesInterface);
