import { Route, Switch } from "react-router-dom";
import PortalPage from "./pages/portal";
import MembersLoginPage from "./pages/portal/members/login";
import "./index.css";
import MembersSignUpPage from "./pages/portal/members/sign-up";
import SponsorsPage from "./pages/sponsors";
import MembersDashboardIndexPage from "./pages/member-dashboard";
import MemberDashboard_Settings from "./pages/member-dashboard/settings";
import MemberDashboard_Events from "./pages/member-dashboard/events";
import MemberDashboard_Admin from "./pages/member-dashboard/admin-tab";
import SponsorsLoginPage from "./pages/portal/sponsors/login";
import AdminTab_Announcements from "./pages/member-dashboard/admin-tab/announcements";
import AdminTab_Announcements_Add from "./pages/member-dashboard/admin-tab/announcements/add";
import AdminTab_Announcements_Edit from "./pages/member-dashboard/admin-tab/announcements/edit";
import AdminTab_Events from "./pages/member-dashboard/admin-tab/events";
import AdminTab_Events_Add from "./pages/member-dashboard/admin-tab/events/add";
import MemberDashboard_Announcements from "./pages/member-dashboard/announcements";
import AdminTab_Events_Edit from "./pages/member-dashboard/admin-tab/events/edit";
import AdminTab_Members from "./pages/member-dashboard/admin-tab/members";
import AdminTab_Members_Verify from "./pages/member-dashboard/admin-tab/members/verify";
import MemberDashboard_Forums from "./pages/member-dashboard/forums";
import MemberDashboard_Forums_Add from "./pages/member-dashboard/forums/add";
import MemberDashboard_Forums_View from "./pages/member-dashboard/forums/view";
import AboutUsPage from "./pages/about-us";
import MemberDashboard_Profile from "./pages/member-dashboard/profile";
import AdminTab_Events_Attendance from "./pages/member-dashboard/admin-tab/events/attendance";
import HomePage from "./pages/homepage";
import MemberDashboard_Advertisements from "./pages/member-dashboard/advertisements";
import MemberDashboard_Advertisements_Add from "./pages/member-dashboard/advertisements/add";
import AdminTab_Advertisements from "./pages/member-dashboard/admin-tab/advertisements";
import MembersResetPassword from "./pages/portal/members/reset-password";
import MembersUpdatePassword from "./pages/portal/members/update-password";
import AdminTab_Sponsors from "./pages/member-dashboard/admin-tab/sponsors";
import AdminTab_Sponsors_New from "./pages/member-dashboard/admin-tab/sponsors/new";

function App() {
  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       axios.get("/auth/verify-token").then((_response) => {
  //         if (_response.status === 200) {
  //           setCurrentUser(_response.data._member);
  //         }
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/portal" component={PortalPage} />
      <Route exact path="/members/login" component={MembersLoginPage} />
      <Route exact path="/members/sign-up" component={MembersSignUpPage} />
      <Route
        exact
        path="/members/reset-password"
        component={MembersResetPassword}
      />
      <Route
        exact
        path="/members/update-password"
        component={MembersUpdatePassword}
      />
      <Route exact path="/sponsors" component={SponsorsPage} />
      <Route exact path="/about-us" component={AboutUsPage} />
      <Route exact path="/sponsors/login" component={SponsorsLoginPage} />
      <Route exact path="/dashboard" component={MembersDashboardIndexPage} />
      <Route exact path="/settings" component={MemberDashboard_Settings} />
      <Route exact path="/events" component={MemberDashboard_Events} />
      <Route
        exact
        path="/announcements"
        component={MemberDashboard_Announcements}
      />
      <Route
        exact
        path="/advertisements"
        component={MemberDashboard_Advertisements}
      />
      <Route
        exact
        path="/advertisements/add"
        component={MemberDashboard_Advertisements_Add}
      />
      <Route exact path="/forums" component={MemberDashboard_Forums} />
      <Route exact path="/forums/add" component={MemberDashboard_Forums_Add} />
      <Route
        exact
        path="/forums/:postId"
        component={MemberDashboard_Forums_View}
      />
      <Route
        exact
        path="/members/profile"
        component={MemberDashboard_Profile}
      />
      <Route exact path="/admin" component={MemberDashboard_Admin} />
      <Route
        exact
        path="/admin/announcements"
        component={AdminTab_Announcements}
      />
      <Route
        exact
        path="/admin/announcements/add"
        component={AdminTab_Announcements_Add}
      />
      <Route
        exact
        path="/admin/announcements/edit"
        component={AdminTab_Announcements_Edit}
      />
      <Route exact path="/admin/events" component={AdminTab_Events} />
      <Route exact path="/admin/events/add" component={AdminTab_Events_Add} />
      <Route exact path="/admin/events/edit" component={AdminTab_Events_Edit} />
      <Route
        exact
        path="/admin/events/attendance"
        component={AdminTab_Events_Attendance}
      />
      <Route exact path="/admin/members" component={AdminTab_Members} />
      <Route
        exact
        path="/admin/members/verify"
        component={AdminTab_Members_Verify}
      />
      <Route
        exact
        path="/admin/advertisements"
        component={AdminTab_Advertisements}
      />
      <Route exact path="/admin/sponsors" component={AdminTab_Sponsors} />
      <Route
        exact
        path="/admin/sponsors/new"
        component={AdminTab_Sponsors_New}
      />
    </Switch>
  );
}

export default App;
