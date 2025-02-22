import { useEffect, useState } from "react";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { DigitalIdentity__factory } from "../../../contract/typechain-types/factories/DigitalIdentity__factory";
import { RegisterIdentityForm } from "./identity/RegisterIdentityForm";
import { EditIdentityForm } from "./identity/EditIdentityForm";
import { IdentityDisplay } from "./identity/IdentityDisplay";
import { IdentityFormData } from "./identity/IdentityForm";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<IdentityFormData>({
    name: "",
    birthDate: "",
    introduction: "",
    email: "",
    website: "",
  });

  const {
    data: myIdentity,
    isPending: isIdentityPending,
    refetch,
  } = useReadContract({
    address: contractAddress,
    functionName: "getIdentityByAddress",
    abi: DigitalIdentity__factory.abi,
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const {
    data: registerHash,
    isPending: isRegisterPending,
    writeContract: writeRegisterContract,
  } = useWriteContract();

  const { isLoading: isRegisterConfirming, isSuccess: isRegisterConfirmed } =
    useWaitForTransactionReceipt({
      hash: registerHash,
    });

  const {
    data: updateHash,
    isPending: isUpdatePending,
    writeContract: writeUpdateContract,
  } = useWriteContract();

  const { isLoading: isUpdateConfirming, isSuccess: isUpdateConfirmed } =
    useWaitForTransactionReceipt({
      hash: updateHash,
    });

  const handleRegister = async () => {
    const birthDateTimestamp = new Date(formData.birthDate).getTime() / 1000;
    await writeRegisterContract({
      address: contractAddress,
      abi: DigitalIdentity__factory.abi,
      functionName: "registerIdentity",
      args: [
        formData.name,
        BigInt(birthDateTimestamp),
        formData.introduction,
        formData.email,
        formData.website,
      ],
    });
  };

  const handleEdit = () => {
    if (!myIdentity) return;

    setFormData({
      name: myIdentity[0],
      birthDate: new Date(Number(myIdentity[1]) * 1000)
        .toISOString()
        .split("T")[0],
      introduction: myIdentity[2],
      email: myIdentity[3],
      website: myIdentity[4],
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const birthDateTimestamp = new Date(formData.birthDate).getTime() / 1000;
    await writeUpdateContract({
      address: contractAddress,
      abi: DigitalIdentity__factory.abi,
      functionName: "updateIdentity",
      args: [
        formData.name,
        BigInt(birthDateTimestamp),
        formData.introduction,
        formData.email,
        formData.website,
      ],
    });
  };

  useEffect(() => {
    if (isRegisterConfirmed) {
      refetch();
      alert(registerHash);
    }
  }, [isRegisterConfirmed, isUpdateConfirmed, refetch, registerHash]);

  useEffect(() => {
    if (isUpdateConfirmed) {
      refetch();
      alert(updateHash);
    }
  }, [isRegisterConfirmed, isUpdateConfirmed, refetch, updateHash]);

  if (isIdentityPending) {
    return <div>Loading...</div>;
  }

  if (isRegisterConfirming || isUpdateConfirming) {
    return <div>Confirming...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {myIdentity ? (
        isEditing ? (
          <EditIdentityForm
            formData={formData}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            isPending={isUpdatePending}
            onUpdate={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <IdentityDisplay identity={myIdentity} onEdit={handleEdit} />
        )
      ) : (
        <RegisterIdentityForm
          formData={formData}
          onFormDataChange={(data) =>
            setFormData((prev) => ({ ...prev, ...data }))
          }
          isPending={isRegisterPending}
          onRegister={handleRegister}
        />
      )}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
