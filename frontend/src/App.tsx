import { BrowserRouter as Router, Routes, Route } from "react-router";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import CheckStudentScore from "./pages/Tables/CheckStudentScore";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Report from "./pages/Dashboard/Report";
import Top10 from "./pages/Top10/Top10";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Report />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Check student score */}
            <Route path="/check-student-score" element={<CheckStudentScore />} />

            {/* Top 10 score of group A*/}
            <Route path="/top-10-group-a" element={<Top10 />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}
