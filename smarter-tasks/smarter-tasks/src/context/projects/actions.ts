import { API_ENDPOINT } from '../../config/constants';


export const fetchProjects = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  
  try {
    dispatch({ type: "FETCH_PROJECTS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/projects`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching projects:', error);
    dispatch({ type: "FETCH_PROJECTS_FAILURE", payload: 'Unable to load projects' });
  }
};

export const addProject = async (dispatch: any, args: any) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const response = await fetch(`${API_ENDPOINT}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
  
        // Next, I'll pass the `args` here
        body: JSON.stringify(args), 
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        return { ok: false, error: data.errors[0].message }
      }
      console.log(data)
      // And if everything goes well with the API call, we will dispatch an action, 
      // with `type` set to `ADD_PROJECT_SUCCESS` and in `payload` we will send the 
      // new project `data`.
      dispatch({ type: 'ADD_PROJECT_SUCCESS', payload: data });
      console.log(data)
      // Next, I'll return a status called "ok", with value `true`
      // as everything went well.
      return { ok: true }
    } catch (error) {
      console.error('Operation failed:', error);
    // Dialogue 5: And for error I'll return status called "ok", with value `false`.
      return { ok: false, error }
    }
  };