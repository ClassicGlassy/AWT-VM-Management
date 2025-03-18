import { useParams } from "react-router-dom";

function DashboardEditVM() {
  const { uid } = useParams();

  // TODO: Remove in Production
  const vmList = [
    {
      name: "Saurab",
      uid: "123456",
    },
    {
      name: "Alice",
      uid: "234567",
    },
    {
      name: "Bob",
      uid: "345678",
    },
    {
      name: "Charlie",
      uid: "456789",
    },
    {
      name: "David",
      uid: "567890",
    },
    {
      name: "Eva",
      uid: "678901",
    },
    {
      name: "Frank",
      uid: "789012",
    },
    {
      name: "Grace",
      uid: "890123",
    },
    {
      name: "Hannah",
      uid: "901234",
    },
    {
      name: "Ivy",
      uid: "012345",
    },
  ];

  const foundVm = vmList.find((vm) => vm.uid === uid);

  return <div>{foundVm ? foundVm.name : "UID not found"}</div>;
}
export default DashboardEditVM;
