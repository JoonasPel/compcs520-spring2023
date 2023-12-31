/**
 * DO NOT EDIT THIS FILE!!
 */

import { addPlayer, removePlayer, togglePlayerStatus } from './store/actionCreators.js';

/**
 * Return update/delete player button click handler function
 *
 * Returned function handles dispatching proper actions to redux store when
 * button is clicked.
 *
 * @param object store redux store
 * @returns function event listener function for update/delete button clicks
 */
const clickHandler = store => {
  return e => {
    if (e.target.classList.contains('toggle-btn')) {
      store.dispatch(togglePlayerStatus(Number.parseInt(e.target.dataset.id)));
    } else if (e.target.classList.contains('delete-btn')) {
      store.dispatch(removePlayer(Number.parseInt(e.target.dataset.id)));
    }
  };
};

/**
 * Return form submit handler function for add player form
 *
 * Returned function handles form submission and dispatching addPlayer action
 * to redux store.
 *
 * @param object store redux store
 * @returns function event listener function for add player form submit
 */
export const submitHandler = store => {
  return e => {
    e.preventDefault();
    const addPlayerForm = e.target.closest('form');
    const formData = new FormData(addPlayerForm);
    const name = formData.get('name');
    const isActive = formData.has('active');

    store.dispatch(addPlayer({ name, isActive }));
    addPlayerForm.reset();
  };
};

/**
 * Return store observer function for updating player listing
 *
 * Returned observer is responsible for updating the player list on the page
 * when store state changes.
 *
 * @param String listId Id of the list element
 * @param object store redux store
 */
export const storeObserver = (listId, store) => {
  const playersList = document.querySelector('#players-list');
  const handleClick = clickHandler(store);

  if (!playersList) {
    console.error(
      `Could not find players list element with id "${listId}"! Returning a dummy observer.`
    );
    return () => {
      console.info('Observer function called.');
    };
  }

  // Helper function to create individual list elements
  const createListItem = player => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
      <div class="player-id">ID: ${player.id}</div>
      <div class="player-name">${player.name}</div>
      <div class="player-status">${player.isActive ? 'active' : 'inactive'}</div>
      <button class="btn btn-warning toggle-btn" data-id="${player.id}">Toggle Activity</button>
      <button class="btn btn-danger delete-btn" data-id="${player.id}">Delete</button>
    `;

    return listItem;
  };

  return () => {
    // remove old event listeners and empty the list
    playersList
      .querySelectorAll('button')
      .forEach(button => button.removeEventListener('click', handleClick));

    playersList.innerHTML = '';

    store.getState().forEach(player => {
      const listItem = createListItem(player);

      // add event listeners to update and delete buttons
      listItem
        .querySelectorAll('button')
        .forEach(button => button.addEventListener('click', handleClick));

      playersList.append(listItem);
    });
  };
};
