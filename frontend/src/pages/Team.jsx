// src/pages/Team.jsx

import React from 'react';

const Team = () => {
  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-6 text-center text-blue-700">Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-center">
        {/* Akhil Purella */}
        <div className="team-card">
          <img
            src="/team/akhil.jpg"
            alt="Akhil Purella"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Akhil Purella</h3>
            <p className="text-gray-600">Banner ID: 001260249</p>
            <p className="text-gray-600">Email: purellaakhil07@gmail.com</p>
            <p className="text-gray-600">Role: PowerBI Dashboard Developer</p>
          </div>
        </div>

        {/* Sethu Sai Laxmana Manideep Rallapalli */}
        <div className="team-card">
          <img
            src="/team/Manideep.jpg"
            alt="Sethu Sai Laxmana Manideep Rallapalli"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Sethu Sai Laxmana Manideep Rallapalli</h3>
            <p className="text-gray-600">Banner ID: 001300424</p>
            <p className="text-gray-600">Email: sethusailaxmana.rallapalli@slu.edu</p>
            <p className="text-gray-600">Role: Team Leader</p>
          </div>
        </div>

        {/* Srivatsava Ram Kishan Rakurthi */}
        <div className="team-card">
          <img
            src="/team/srakurthi (1).jpg"
            alt="Srivatsava Ram Kishan Rakurthi"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Srivatsava Ram Kishan Rakurthi</h3>
            <p className="text-gray-600">Banner ID: 001311534</p>
            <p className="text-gray-600">Email: srivatsava.rakurthi@gmail.com</p>
            <p className="text-gray-600">Role: Application Developer</p>
          </div>
        </div>

        {/* Dharma Teja Ramisetty */}
        <div className="team-card">
          <img
            src="/team/dharma (1).jpg"
            alt="Dharma Teja Ramisetty"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Dharma Teja Ramisetty</h3>
            <p className="text-gray-600">Banner ID: 001305113</p>
            <p className="text-gray-600">Email: dharmateja0129@gmail.com</p>
            <p className="text-gray-600">Role: PowerBI Dashboard Developer</p>
          </div>
        </div>

        {/* Pramod Sai Tamminani */}
        <div className="team-card">
          <img
            src="/team/Pramod.jpg"
            alt="Pramod Sai Tamminani"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Pramod Sai Tamminani</h3>
            <p className="text-gray-600">Banner ID: 001274947</p>
            <p className="text-gray-600">Email: tamminanipramodsai@gmail.com</p>
            <p className="text-gray-600">Role: Data Engineer</p>
          </div>
        </div>

        {/* Trisha Crump */}
        <div className="team-card">
          <img
            src="/team/trisha.jpg"
            alt="Trisha Crump"
            className="rounded object-cover shadow border border-gray-300 mr-4"
            style={{ width: '120px', height: '150px' }}
          />
          <div>
            <h3 className="text-blue-700 text-xl">Guided By</h3>
            <p className="text-gray-600">Ms. Trisha Crump</p>
            <p className="text-gray-600">Email: trisha.zalenski@slu.edu</p>
            <p className="text-gray-600">Role: Customer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;