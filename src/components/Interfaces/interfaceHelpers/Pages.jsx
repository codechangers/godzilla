import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton, makeStyles, Button, Typography } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import WhoAmIModal from './WhoAmIModal';
import NavDrawer from '../../UI/NavDrawer';
import { toData } from '../../../helpers';
import { resolveImg } from '../../../resources/images';

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

const Markdown = ({ pages, page }) => {
  const [content, setContent] = useState('# Hello World');

  // Fetch page content.
  useEffect(() => {
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
    paragraph: ({ children }) => {
      return children;
    },
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
    '& pre': {
      paddingBottom: 20,
      maxWidth: '100%',
      overflowX: 'scroll'
    }
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
