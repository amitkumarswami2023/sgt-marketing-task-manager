import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/auth/authSlice";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import ProfileStats from "../../components/profile/ProfileStats";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />

      <ProfileStats />

      <ProfileInfoCard user={user} />
    </div>
  );
};

export default Profile;
