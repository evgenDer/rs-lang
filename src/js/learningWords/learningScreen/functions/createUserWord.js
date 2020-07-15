const word1 = {
  difficulty: 'string',
  optional: {},
};

export default async function createUserWord({ wordId, word }) {
  const userId = JSON.stringify(localStorage.getItem('userId')).replace(/"/g, '');
  const token = JSON.stringify(localStorage.getItem('token')).replace(/"/g, '');

  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    },
  );
  const content = await rawResponse.json();
}
/*
createUserWord({
  wordId: '5e9f5ee35eb9e72bc21af716',
  word: { difficulty: 'weak', optional: { testFieldString: 'test', testFieldBoolean: true } },
});
*/
