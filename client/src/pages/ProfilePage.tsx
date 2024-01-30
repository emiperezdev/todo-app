import useUserState from "../state/useUserState"

export const ProfilePage = () => {
  const user = useUserState(s => s.user);

  return (
    <div>{user?.username}</div>
  )
}
