const INITIAL_STATE = [
  'IVAN',
  'Serhii',
];

export default function users(state = INITIAL_STATE, action ) {
  switch (action.type) {
    case 'ADD_USER': {
      return [
        ...state,
        action.usersName,
      ];
    }
    case 'DELETE_USER': {
      console.log(action.usersName);
      let deleteUser = [...state];
      return deleteUser.splice();
    }
    default: return state;
  }
}