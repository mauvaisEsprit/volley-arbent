import React, {useState} from 'react';
import NewsList from '../admin/NewsList'
import NewsForm from '../admin/NewsForm';
import EventList from '../admin/EventList';
import EventForm from '../admin/EventForm';
import Messages from '../admin/Messages';
import '../../styles/pageStyles/Dashboard.css';

export default function Dashboard() {
  const [section, setSection] = useState('newsList');

  const renderSection = () => {
    switch (section) {
      case 'newsForm':
        return <NewsForm />;
      case 'newsList':
        return <NewsList />;
      case 'eventForm':
        return <EventForm />;
      case 'eventList':
        return <EventList />;
      case 'messages':
        return <Messages />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <ul>
          <li onClick={() => setSection('newsForm')}>➕ Ajouter une actualité</li>
          <li onClick={() => setSection('newsList')}>📰 Toutes les actualités</li>
          <li onClick={() => setSection('eventForm')}>➕ Ajouter un événement</li>
          <li onClick={() => setSection('eventList')}>📅 Tous les événements</li>
          <li onClick={() => setSection('messages')}>📨 Messages reçus</li>
        </ul>
      </aside>

      <main className="admin-content">
        {renderSection()}
      </main>
    </div>
  );
}
