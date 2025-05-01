// src/pages/Home.jsx

import React from 'react';

const Home = () => {
  return (
    <section className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Healthcare Management System
      </h2>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Our Healthcare Management System is designed to streamline patient and doctor interactions, providing comprehensive tracking of medical records, appointments, and patient vitals.
      </p>

      <div className="space-y-12">
        {/* Patient Well-being Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Patient Well-being Tracking</h3>
          <p className="text-gray-600 leading-relaxed">
            This dashboard page tracks patient vitals, medication adherence, and follow-up appointment performance. It features a line chart showing trends in Heart Rate and Oxygen Level over time, filtered by selected Patient_IDs. Alongside, a dynamic table presents each patient's active medications, listing their start and end dates. A calculated DAX column, "Adherence_Days," quantifies the medication coverage period. Additionally, a KPI card displays the "Follow-up Completion Rate," calculated as the ratio of completed visits to total follow-up visits. This setup empowers healthcare teams to quickly identify gaps in patient care, spot declining health indicators early, and take preventive action. The use of simple filters and visual alerts allows for rapid clinical decision-making without overwhelming the user with unnecessary detail.
          </p>
          {/* Adjusting Image Layout */}
          <div className="mt-6 flex justify-center">
            <img
              src="/Home/image 1.jpg"
              alt="Patient Well-being Tracking"
              className="w-full md:w-3/4 lg:w-2/3 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Postoperative Recovery Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Postoperative Recovery Analysis</h3>
          <p className="text-gray-600 leading-relaxed">
            A year-over-year line graph illustrates a declining trend in the average number of follow-ups per patient, highlighting either improved recovery or potential under-monitoring. A pie chart segments patients into normal and high-risk categories based on follow-up gaps using a calculated DAX flag. Supporting slicers for year and patient ID allow quick filtering. The detailed table lists visit dates and computed gaps between follow-ups, enabling identification of at-risk patients. The KPI card “Total Followups” summarizes engagement volume, essential for operational planning and risk mitigation strategies.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="/Home/image 2.jpg"
              alt="Postoperative Recovery Analysis"
              className="w-full md:w-3/4 lg:w-2/3 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Doctor’s Decision Support System */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Doctor’s Decision Support System</h3>
          <p className="text-gray-600 leading-relaxed">
            This page provides insights into the workload distribution and experience effectiveness among doctors. A heatmap shows the number of follow-ups handled by each doctor categorized by their status (Completed, Missed, Scheduled), highlighting doctors who are potentially overloaded or excelling in patient management. A supporting bar chart presents the number of unique patients handled by doctors versus their years of experience. Additionally, a slicer based on medical specialty enables comparative analysis across fields like cardiology, pulmonology, and general practice. This tool helps administrators identify top-performing doctors, detect burnout risks, and ensure balanced patient-doctor allocation. It promotes a data-driven approach to enhancing physician efficiency and patient outcomes.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="/Home/image 3.jpg"
              alt="Doctor’s Decision Support System"
              className="w-full md:w-3/4 lg:w-2/3 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Patient Engagement & Compliance */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">4. Patient Engagement & Compliance</h3>
          <p className="text-gray-600 leading-relaxed">
            The “Patient Engagement & Compliance” dashboard provides an interactive view of patient follow-up and treatment status. The pie chart categorizes patients based on their Next_Checkup_Date status, such as "Recovered," "Under Treatment," or "Healing," giving a quick overview of engagement levels across treatment stages. A matrix beside it displays the number of patients scheduled for checkups on specific future dates, helping identify engagement trends over time. Slicers for Patient_ID, AGE, and Doctor_ID allow users to filter data based on demographics or specific doctors, making it easy to analyze patterns at an individual or group level. When a patient is selected, their name and address are dynamically displayed, showing personalized information tied to the data. The dashboard relies on relationships across multiple tables—primarily linking Patient_ID and Doctor_ID from the Followup, Patient, and Doctor tables. This integration allows users, such as clinical managers, to monitor compliance behavior, identify at-risk groups, and evaluate the effectiveness of follow-up protocols. Overall, the design supports better-informed decisions in patient care and recovery monitoring.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="/Home/image 4.jpg"
              alt="Patient Engagement & Compliance"
              className="w-full md:w-3/4 lg:w-2/3 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Readmission Rate Reduction */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">5. Readmission Rate Reduction</h3>
          <p className="text-gray-600 leading-relaxed">
            The dashboard provides a comprehensive view of patient engagement and follow-up compliance, with a strong focus on reducing readmission risk. The first page visualizes patient distribution by their next checkup date and recovery status through a pie chart, allowing care teams to monitor treatment progress (e.g., Healing, Under Progress, Recovered). Patient-level details like name, age, address, and assigned doctor are displayed dynamically using slicers, facilitating personalized tracking and care coordination.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="/Home/image 5.png"
              alt="Readmission Rate Reduction"
              className="w-full md:w-3/4 lg:w-2/3 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
