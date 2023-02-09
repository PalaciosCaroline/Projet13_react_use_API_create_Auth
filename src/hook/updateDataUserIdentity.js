import { setUserFirstName, setUserLastName} from '../store/user.slice';

export const updateDataUserIdentity = async (setIsLoading, setError,token,  firstName, lastName,dispatch) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName , lastName })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const res = await data.body;
      dispatch(setUserFirstName(res.firstName))
      dispatch(setUserLastName(res.lastName))
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }