import { setUserFirstName, setUserLastName} from '../store/user.slice';

export async function getDataIdentityUser(setIsLoading,setError,token,dispatch ) {
    setIsLoading(true);
      setError(null);
      try{
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },  
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
      const res = await data.body;
      dispatch(setUserFirstName(res.firstName))
      console.log(res.firstName)
      dispatch(setUserLastName(res.lastName))
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
}
