import { fetchMembers } from "../../context/members/actions";
import { useEffect } from "react";
import { useMembersDispatch } from "../../context/members/context";
import MemberListItems from './MemberListItems';

const MemberList: React.FC = () => {
  const dispatchMembers = useMembersDispatch();
  useEffect(() => {
    fetchMembers(dispatchMembers)
  }, [])
  
  return (
    <div className="grid grid-cols-4 gap-4 mt-5">
      <MemberListItems />
    </div>
  );
};
export default MemberList;