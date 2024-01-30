import React from 'react';
import AllModules from '../components/AllModules';
import FutureModules from '../components/FutureModules';
import CreateModule from '../components/CreateModule';
import AuthService from '../services/AuthService'; 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Dashboard() {
    return (
        <div className="container">
                  <div class="text-center" style={{ marginTop: '50px'}} >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png" alt="Logo Spotify" style={{ maxWidth: '100px', margin: '0 auto 20px' }} />
    </div>
        <Tabs>
          <TabList>
            {AuthService.isAdmin() && <Tab>Créer un Module</Tab>}
            <Tab>Tous les Modules</Tab>
            <Tab>Modules Futurs</Tab>
          </TabList>
  
          {AuthService.isAdmin() && (
            <TabPanel>
              <CreateModule />
            </TabPanel>
          )}
          <TabPanel>
            <AllModules />
          </TabPanel>
          <TabPanel>
            <FutureModules />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
 
export default Dashboard;
