import { addUserUrl, updateUserUrl } from "../../config/urls.config";
import { UserInterface } from "../../users/interfaces/user.interface";

const createUser = async (form: Omit<UserInterface, 'id'>) => {
  const responseRaw = await fetch(addUserUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  const response = await responseRaw.json();
  if (response.ok)
    return Promise.resolve(response);
  return Promise.reject(response);
}

const updateUser = async (form: UserInterface) => {
  const responseRaw = await fetch(updateUserUrl(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  const response = await responseRaw.json();
  if (response.ok)
    return Promise.resolve(response);
  return Promise.reject(response);
}
export {
    createUser,
    updateUser
}