import { API_ENDPOINT } from '../../config/constants';


export const fetchMembers = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") || "";
  
  try {
    dispatch({ type: "FETCH_MEMBERS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching Members:', error);
    dispatch({ type: "FETCH_MEMBERS_FAILURE", payload: 'Unable to load members' });
  }
};

export const addMember = async (dispatch: any, args: any) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
          body: JSON.stringify(args), 
        
      });
      console.log(args) 
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        return { ok: false, error: data.errors[0].message }
      }
      console.log(data)
      dispatch({ type: 'ADD_MEMBER_SUCCESS', payload: data.user });
      console.log(data)
      return { ok: true }
    } catch (error) {
      console.error('Operation failed:', error);
      return { ok: false, error }
    }
  };
  export const deleteMember = async (dispatch: any, id: number) => {
    const token = localStorage.getItem("authToken") || "";
  
    try {
      dispatch({ type: "DELETE_USER_REQUEST" });
      const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }
  
      dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: id });
      return { ok: true };
    } catch (error) {
      console.error("Operation failed:", error);
      return { ok: false, error: "Unable to delete user" };
    }
  };