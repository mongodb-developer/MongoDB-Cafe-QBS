import React, { useEffect, useState } from 'react';
import Realm, { App } from "realm";
import './App.css';
import Footer from './Footer';

const REALM_APP_ID = 'YOUR APP ID'; // Replace your App Services App ID here.
const app = new App({ id: REALM_APP_ID });

// Define Realm data model
const CoffeeSchema = { 
  name: 'Coffee',
  properties: {
    _id: 'int',
    name: 'string',
    consumed: 'int',
  },
  primaryKey: '_id',
};

// Function to open a synced realm
async function openSyncedRealm() {
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);

  // Define the configuration for the Flexible Sync
  const config = {
    schema: [CoffeeSchema],
    sync: {
      user: user,
      flexible: true,
      initialSubscriptions: {
        update: (subs, realm) => {
          subs.add(realm.objects('Coffee').filtered(`name != null`));
        },
      },
    },
  };

  // Open the realm with the specified configuration
  return await Realm.open(config);
}

const drinksData = [
  { _id: 1, name: 'Americano', icon: 'americano_icon.png' },
  { _id: 2, name: 'Cafe Latte', icon: 'cafe_latte_icon.png' },
  { _id: 3, name: 'Espresso', icon: 'espresso_icon.png' },
  { _id: 4, name: 'Latte Macchiato', icon: 'latte_macchiato_icon.png' }
];

function Apps() {
  const [realm, setRealm] = useState(null);
  const [drinksCount, setDrinksCount] = useState({});

  useEffect(() => {
    let mounted = true;

    openSyncedRealm().then((openedRealm) => {
      if (mounted) {
        setRealm(openedRealm);
        const drinks = openedRealm.objects('Coffee');
        // Update local state when Realm data changes
        drinks.addListener(() => {
          const counts = {};
          drinks.forEach(d => counts[d.name] = d.consumed);
          setDrinksCount(counts);
        });
      }
    });

    return () => {
      mounted = false;
      if (realm) {
        realm.close();
      }
    };
  }, []);

  const handleDrinkCountChange = (drinkName, change) => {
    if (realm) {
      realm.write(() => {
        let coffee = realm.objectForPrimaryKey('Coffee', drinksData.find(d => d.name === drinkName)._id);
        if (coffee) {
          coffee.consumed = Math.max(coffee.consumed + change, 0);
        } else {
          realm.create('Coffee', { _id: drinksData.find(d => d.name === drinkName)._id, name: drinkName, consumed: Math.max(0, change) });
        }
      });
    }
  };

  return (
    <div className="app">
      <div className="daily-coffee-counter">
        <span className="daily-coffee-label">My daily coffee consumption:</span>
        <span className="daily-coffee-count">
          {Object.values(drinksCount).reduce((acc, count) => acc + count, 0)}
        </span>
      </div>
      <h1 className="title">MongoDB Cafe</h1>
      <div className="drinks-container">
        {drinksData.map((drink) => (
          <div className="drink" key={drink.name}>
            <img src={drink.icon} alt={drink.name} className="drink-icon" />
            <div className="drink-details">
              <button onClick={() => handleDrinkCountChange(drink.name, -1)}>-</button>
              <span>{drinksCount[drink.name] || 0}</span>
              <button onClick={() => handleDrinkCountChange(drink.name, 1)}>+</button>
            </div>
            <div className="drink-name">{drink.name}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Apps;
