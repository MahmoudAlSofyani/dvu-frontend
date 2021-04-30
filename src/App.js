import Header from "./components/header";
import Layout from "./components/layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PortalPage from "./pages/portal";
import MembersLoginPage from "./pages/portal/members/login";
import "./index.css";
import MembersSignUpPage from "./pages/portal/members/sign-up";
import SponsorsPage from "./pages/sponsors";
import MembersDashboardIndexPage from "./pages/member-dashboard";
import MemberDashboard_Settings from "./pages/member-dashboard/settings";
import MemberDashboard_Events from "./pages/member-dashboard/events";
import SponsorsLoginPage from "./pages/portal/sponsors/login";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route exact path="/portal" component={PortalPage} />
        <Route exact path="/members/login" component={MembersLoginPage} />
        <Route exact path="/members/sign-up" component={MembersSignUpPage} />
        <Route exact path="/sponsors" component={SponsorsPage} />
        <Route exact path="/sponsors/login" component={SponsorsLoginPage} />
        <Route
          exact
          path="/members/dashboard"
          component={MembersDashboardIndexPage}
        />
        <Route
          exact
          path="/members/settings"
          component={MemberDashboard_Settings}
        />
        <Route
          exact
          path="/members/events"
          component={MemberDashboard_Events}
        />
      </Switch>
    </Router>
  );
}

export default App;
