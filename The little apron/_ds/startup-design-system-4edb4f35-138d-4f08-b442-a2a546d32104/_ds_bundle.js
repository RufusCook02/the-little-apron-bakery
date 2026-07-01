/* @ds-bundle: {"format":3,"namespace":"StartupDesignSystem_4edb4f","components":[],"sourceHashes":{"ui_kits/startup-app/App.jsx":"81ac958cc243","ui_kits/startup-app/Chat.jsx":"a3260c6d1014","ui_kits/startup-app/Dashboard.jsx":"11d7a62535e8","ui_kits/startup-app/Login.jsx":"2eb67a8576a5","ui_kits/startup-app/Shell.jsx":"8523ae0bd537","ui_kits/startup-app/Todos.jsx":"c882aafda294"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StartupDesignSystem_4edb4f = window.StartupDesignSystem_4edb4f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/startup-app/App.jsx
try { (() => {
/* Startup App UI Kit — main app: login → shell + routed screens */
function App() {
  const [authed, setAuthed] = React.useState(false);
  const [screen, setScreen] = React.useState("dashboard");
  const [collapsed, setCollapsed] = React.useState(false);
  const user = {
    name: "Alex Morgan",
    initials: "AM",
    org: "Acme Apparel Co."
  };
  if (!authed) return /*#__PURE__*/React.createElement(Login, {
    onSignIn: () => {
      setAuthed(true);
      setScreen("dashboard");
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Sidenav, {
    current: screen,
    onNavigate: setScreen,
    collapsed: collapsed,
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement(Topbar, {
    onToggle: () => setCollapsed(c => !c),
    onLogout: () => setAuthed(false),
    user: user,
    unread: 2
  }), screen === "dashboard" && /*#__PURE__*/React.createElement(Dashboard, {
    user: user,
    onNavigate: setScreen
  }), screen === "todos" && /*#__PURE__*/React.createElement(Todos, null), screen === "chat" && /*#__PURE__*/React.createElement(Chat, null)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/startup-app/Chat.jsx
try { (() => {
/* Startup App UI Kit — Chat screen (interactive) */
function Chat() {
  const users = [{
    id: 1,
    name: "Priya Nair",
    initials: "PN",
    status: "online"
  }, {
    id: 2,
    name: "Marco Silva",
    initials: "MS",
    status: "online"
  }, {
    id: 3,
    name: "Hana Tanaka",
    initials: "HT",
    status: "away"
  }, {
    id: 4,
    name: "Daniel Okafor",
    initials: "DO",
    status: "offline"
  }];
  const seed = {
    1: [{
      me: false,
      text: "Hey — did the costing sheet for style 4471 go through?",
      time: "9:02 AM"
    }, {
      me: true,
      text: "Just approved it. BOM looks good for the run.",
      time: "9:04 AM"
    }, {
      me: false,
      text: "Perfect. I'll schedule the colouration batch then.",
      time: "9:05 AM"
    }],
    2: [{
      me: false,
      text: "Workstation 3 is back online — production resumed.",
      time: "8:40 AM"
    }],
    3: [],
    4: []
  };
  const [active, setActive] = React.useState(1);
  const [threads, setThreads] = React.useState(seed);
  const [text, setText] = React.useState("");
  const bodyRef = React.useRef(null);
  const send = () => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
    setThreads(t => ({
      ...t,
      [active]: [...(t[active] || []), {
        me: true,
        text: text.trim(),
        time: now
      }]
    }));
    setText("");
  };
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [threads, active]);
  const activeUser = users.find(u => u.id === active);
  const msgs = threads[active] || [];
  const label = {
    online: "Online",
    away: "Away",
    offline: "Offline"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Chat"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Message your team"))), /*#__PURE__*/React.createElement("div", {
    className: "chat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-search"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Search users..."
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  })), /*#__PURE__*/React.createElement("div", {
    className: "chat-users"
  }, users.map(u => /*#__PURE__*/React.createElement("div", {
    key: u.id,
    className: "chat-user" + (u.id === active ? " active" : ""),
    onClick: () => setActive(u.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, u.initials, /*#__PURE__*/React.createElement("span", {
    className: "presence " + u.status
  })), /*#__PURE__*/React.createElement("div", {
    className: "cu-name"
  }, u.name))))), /*#__PURE__*/React.createElement("div", {
    className: "chat-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, activeUser.name), /*#__PURE__*/React.createElement("div", {
    className: "st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot presence " + activeUser.status
  }), label[activeUser.status])), /*#__PURE__*/React.createElement("div", {
    className: "chat-body",
    ref: bodyRef
  }, msgs.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "chat-empty"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-off"
  }), "No messages yet. Send the first message!") : msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "msg " + (m.me ? "me" : "them")
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, m.me ? "Me" : activeUser.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, m.text), /*#__PURE__*/React.createElement("div", {
    className: "time"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), m.time))))), /*#__PURE__*/React.createElement("div", {
    className: "chat-foot"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Enter message...",
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => e.key === "Enter" && send()
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: send
  }, "Send", /*#__PURE__*/React.createElement(Icon, {
    name: "send-2"
  }))))));
}
Object.assign(window, {
  Chat
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/Chat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/startup-app/Dashboard.jsx
try { (() => {
/* Startup App UI Kit — Dashboard screen */
function Dashboard({
  user,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Welcome back, ", user.name.split(" ")[0], "!")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye"
  }), "View Templates")), /*#__PURE__*/React.createElement("div", {
    className: "banner",
    style: {
      marginBottom: "var(--startup-space-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    className: "bld"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, user.org), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)"
    }
  }, "Tenant Key: ", /*#__PURE__*/React.createElement("code", null, "acme-corp")))), /*#__PURE__*/React.createElement("div", {
    className: "grid g-3",
    style: {
      marginBottom: "var(--startup-space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card card-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-ic tint-primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "stat-lbl"
  }, "Total Users"), /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "248"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    style: {
      color: "var(--startup-success)"
    }
  }), "12 new this month")), /*#__PURE__*/React.createElement("div", {
    className: "card card-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-ic tint-success"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "stat-lbl"
  }, "Active Users"), /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "213"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "activity",
    style: {
      color: "var(--startup-success)"
    }
  }), "Currently active")), /*#__PURE__*/React.createElement("div", {
    className: "card card-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-ic tint-warning"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "stat-lbl"
  }, "Suspended"), /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "35"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    style: {
      color: "var(--startup-warning)"
    }
  }), "Requires attention"))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "activity"
  }), "Quick Actions"), /*#__PURE__*/React.createElement("div", {
    className: "card-pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid g-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "qa",
    onClick: () => onNavigate("todos")
  }, /*#__PURE__*/React.createElement("span", {
    className: "qa-ic tint-primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "checkup-list"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h6", null, "Manage Todos"), /*#__PURE__*/React.createElement("small", null, "Track your tasks")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    className: "chev"
  })), /*#__PURE__*/React.createElement("button", {
    className: "qa",
    onClick: () => onNavigate("chat")
  }, /*#__PURE__*/React.createElement("span", {
    className: "qa-ic tint-info"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-dots"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h6", null, "Open Chat"), /*#__PURE__*/React.createElement("small", null, "Message your team")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    className: "chev"
  })), /*#__PURE__*/React.createElement("button", {
    className: "qa"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qa-ic tint-success"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h6", null, "Manage Users"), /*#__PURE__*/React.createElement("small", null, "Tenant members & roles")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    className: "chev"
  }))))));
}
Object.assign(window, {
  Dashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/startup-app/Login.jsx
try { (() => {
/* Startup App UI Kit — Login / landing screen */
function Login({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "login"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/startup_favicon.png",
    alt: "Startup"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wd"
  }, "Startup")), /*#__PURE__*/React.createElement("p", {
    className: "login-lead"
  }, "Your manufacturing-operations platform. Sign in to access your workspace and keep production moving."), /*#__PURE__*/React.createElement("div", {
    className: "login-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-card"
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: "tabler:layout-dashboard",
    class: "lc-ic",
    style: {
      color: "var(--startup-primary)"
    }
  }), /*#__PURE__*/React.createElement("h5", null, "Dashboard"), /*#__PURE__*/React.createElement("p", null, "Access your personalized workspace with every tool and tenant in one place."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: onSignIn
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "login-card"
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: "tabler:user-plus",
    class: "lc-ic",
    style: {
      color: "var(--startup-success)"
    }
  }), /*#__PURE__*/React.createElement("h5", null, "Get Started"), /*#__PURE__*/React.createElement("p", null, "New to Startup? Create your organization and start your journey today."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-block",
    style: {
      background: "var(--startup-success)",
      color: "#fff"
    },
    onClick: onSignIn
  }, "Sign Up")), /*#__PURE__*/React.createElement("div", {
    className: "login-card"
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: "tabler:eye",
    class: "lc-ic",
    style: {
      color: "var(--startup-info)"
    }
  }), /*#__PURE__*/React.createElement("h5", null, "Take a Tour"), /*#__PURE__*/React.createElement("p", null, "Explore the components and screens to see what Startup can do."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-block",
    style: {
      background: "var(--startup-info)",
      color: "#fff"
    },
    onClick: onSignIn
  }, "View Demo"))), /*#__PURE__*/React.createElement("div", {
    className: "login-foot"
  }, "Built by Wise Group \xB7 secured by Kinde")));
}
Object.assign(window, {
  Login
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/startup-app/Shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Startup App UI Kit — App shell: Sidenav + Topbar */
const {
  useState
} = React;
function Icon({
  name,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("iconify-icon", _extends({
    icon: `tabler:${name}`
  }, rest));
}
function Sidenav({
  current,
  onNavigate,
  collapsed,
  user
}) {
  const [open, setOpen] = useState({
    profile: false,
    setup: false
  });
  const toggle = k => setOpen(o => ({
    ...o,
    [k]: !o[k]
  }));
  const isActive = k => current === k;
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidenav" + (collapsed ? " collapsed" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidenav-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-sm.png",
    alt: "Startup",
    className: "brand-mark"
  }), !collapsed && /*#__PURE__*/React.createElement("span", {
    className: "brand-wd"
  }, "Startup")), /*#__PURE__*/React.createElement("div", {
    className: "sidenav-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, user.initials, /*#__PURE__*/React.createElement("span", {
    className: "presence online"
  })), /*#__PURE__*/React.createElement("div", {
    className: "su-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "su-name"
  }, user.name), /*#__PURE__*/React.createElement("div", {
    className: "su-org"
  }, user.org))), /*#__PURE__*/React.createElement("ul", {
    className: "side-nav"
  }, /*#__PURE__*/React.createElement("li", {
    className: "title nav-text"
  }, "Menu"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link" + (isActive("dashboard") ? " active" : ""),
    onClick: () => onNavigate("dashboard")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layout-dashboard"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Dashboard"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: () => toggle("profile")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-circle"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Profile"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    className: "nav-arrow" + (open.profile ? " open" : "")
  })), open.profile && /*#__PURE__*/React.createElement("ul", {
    className: "sub-menu"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link"
  }, "Settings")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link"
  }, "Notifications")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link" + (isActive("chat") ? " active" : ""),
    onClick: () => onNavigate("chat")
  }, "Chat")))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link" + (isActive("todos") ? " active" : ""),
    onClick: () => onNavigate("todos")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "checkup-list"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Todos"), /*#__PURE__*/React.createElement("span", {
    className: "nav-badge"
  }, "5"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link" + (isActive("chat") ? " active" : ""),
    onClick: () => onNavigate("chat")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-dots"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Chat"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: () => toggle("setup")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-cog"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Setup"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    className: "nav-arrow" + (open.setup ? " open" : "")
  })), open.setup && /*#__PURE__*/React.createElement("ul", {
    className: "sub-menu"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link"
  }, "General")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link"
  }, "Users")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "sub-link"
  }, "Notification logs")))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: () => onNavigate("dashboard")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-lock"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-text"
  }, "Admin")))));
}
function Topbar({
  onToggle,
  onLogout,
  user,
  unread
}) {
  const [bell, setBell] = useState(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tb-toggle",
    onClick: onToggle,
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu-4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tb-search"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Search\u2026 (Ctrl+K)",
    readOnly: true
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tb-spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "tb-icon",
    "aria-label": "Theme"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "tb-icon",
    "aria-label": "Notifications",
    onClick: () => setBell(b => !b)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell"
  }), unread > 0 && /*#__PURE__*/React.createElement("span", {
    className: "tb-badge"
  }, unread)), bell && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "absolute",
      right: 0,
      top: 46,
      width: 300,
      zIndex: 40,
      boxShadow: "var(--startup-shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head",
    style: {
      fontSize: 13
    }
  }, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: "1px solid var(--startup-border-light)",
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    style: {
      color: "var(--startup-primary)",
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Costing sheet approved"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--startup-fg2)"
    }
  }, "Style 4471 \xB7 2h ago"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    style: {
      color: "var(--startup-fg3)",
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "New user invited"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--startup-fg2)"
    }
  }, "jordan@acme.co \xB7 1d ago")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      textAlign: "center",
      borderTop: "1px solid var(--startup-border-light)",
      fontSize: 12,
      color: "var(--startup-primary)",
      cursor: "pointer"
    }
  }, "View all notifications"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "avatar",
    style: {
      width: 38,
      height: 38,
      fontSize: 13,
      cursor: "pointer"
    },
    onClick: onLogout,
    title: "Sign out"
  }, user.initials)));
}
Object.assign(window, {
  Icon,
  Sidenav,
  Topbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/startup-app/Todos.jsx
try { (() => {
/* Startup App UI Kit — Todos screen (interactive) */
const PRIORITY = {
  Low: "b-sub-success",
  Medium: "b-sub-warning",
  High: "b-sub-danger",
  Critical: "b-sub-primary"
};
function Todos() {
  const [todos, setTodos] = React.useState([{
    id: 1,
    title: "Finalize Q3 costing sheet",
    priority: "Medium",
    done: false,
    meta: "Created 12 May 2026 · Due 19 May 2026"
  }, {
    id: 2,
    title: "Approve BOM for style 4471",
    priority: "High",
    done: true,
    meta: "Completed 11 May 2026"
  }, {
    id: 3,
    title: "Schedule colouration run — batch 88",
    priority: "Critical",
    done: false,
    meta: "Created 10 May 2026 · Due 14 May 2026"
  }, {
    id: 4,
    title: "Review operator skill matrix",
    priority: "Low",
    done: false,
    meta: "Created 09 May 2026"
  }]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [draft, setDraft] = React.useState({
    title: "",
    desc: ""
  });
  const toggle = id => setTodos(t => t.map(x => x.id === id ? {
    ...x,
    done: !x.done,
    meta: x.done ? "Created today" : "Completed just now"
  } : x));
  const remove = id => setTodos(t => t.filter(x => x.id !== id));
  const create = () => {
    if (!draft.title.trim()) return;
    setTodos(t => [{
      id: Date.now(),
      title: draft.title.trim(),
      priority: "Medium",
      done: false,
      meta: "Created just now"
    }, ...t]);
    setDraft({
      title: "",
      desc: ""
    });
    setShowCreate(false);
  };
  const total = todos.length;
  const completed = todos.filter(t => t.done).length;
  const pct = total ? Math.round(completed / total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Todos"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Manage your tasks and stay organized")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download"
  }), "Export"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload"
  }), "Import"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowCreate(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Add Todo"))), /*#__PURE__*/React.createElement("div", {
    className: "grid g-2-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card card-pad"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list"
  }, todos.map(t => /*#__PURE__*/React.createElement("li", {
    className: "list-item",
    key: t.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "check " + (t.done ? "done" : "todo"),
    onClick: () => toggle(t.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.done ? "check" : "x"
  })), /*#__PURE__*/React.createElement("div", {
    className: "li-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "li-title" + (t.done ? " strike" : "")
  }, t.title, /*#__PURE__*/React.createElement("span", {
    className: "badge " + PRIORITY[t.priority]
  }, t.priority)), /*#__PURE__*/React.createElement("div", {
    className: "li-meta"
  }, t.meta)), /*#__PURE__*/React.createElement("div", {
    className: "li-acts"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-icon btn-sm",
    title: "View"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-icon btn-sm",
    title: "Edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-icon btn-sm",
    title: "Delete",
    onClick: () => remove(t.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash"
  }))))), todos.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "checkup-list"
  }), /*#__PURE__*/React.createElement("h5", null, "No todos yet"), /*#__PURE__*/React.createElement("p", null, "Add your first todo to get started!")))), /*#__PURE__*/React.createElement("div", {
    className: "card card-pad",
    style: {
      alignSelf: "start"
    }
  }, /*#__PURE__*/React.createElement("h5", {
    style: {
      margin: "0 0 14px",
      fontSize: 15,
      color: "var(--startup-gray-900)"
    }
  }, "Quick Stats"), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("span", null, "Total Todos"), /*#__PURE__*/React.createElement("span", {
    className: "badge b-secondary"
  }, total)), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("span", null, "Completed"), /*#__PURE__*/React.createElement("span", {
    className: "badge b-success"
  }, completed)), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("span", null, "Remaining"), /*#__PURE__*/React.createElement("span", {
    className: "badge b-warning"
  }, total - completed)), /*#__PURE__*/React.createElement("div", {
    className: "progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: pct + "%"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "help",
    style: {
      marginTop: 4
    }
  }, pct, "% complete \u2014 keep up the momentum!"))), showCreate && /*#__PURE__*/React.createElement("div", {
    className: "modal-bg",
    onClick: e => e.target.classList.contains("modal-bg") && setShowCreate(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("h5", null, "Create New Todo"), /*#__PURE__*/React.createElement("button", {
    className: "x",
    onClick: () => setShowCreate(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Title ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Enter todo title",
    value: draft.title,
    onChange: e => setDraft({
      ...draft,
      title: e.target.value
    }),
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Description"), /*#__PURE__*/React.createElement("textarea", {
    className: "textarea",
    rows: "3",
    placeholder: "Enter todo description (optional)",
    value: draft.desc,
    onChange: e => setDraft({
      ...draft,
      desc: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-light",
    onClick: () => setShowCreate(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: create
  }, "Create Todo")))));
}
Object.assign(window, {
  Todos
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/startup-app/Todos.jsx", error: String((e && e.message) || e) }); }

})();
