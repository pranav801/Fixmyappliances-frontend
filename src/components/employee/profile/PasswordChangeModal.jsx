import React, { useState } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { EmployeeUrl } from "../../../constants/constants";


function PasswordChangeModal({open,handleOpen,userid}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);


    const checkPassword = async () => {
        try {
            const response = await axios.post(`${EmployeeUrl}/password-change/`, {
                userid,
                current_password: currentPassword,
            });

            if (response.status === 200) {
                setIsCurrentPasswordValid(false);
                
            } 
        } catch (error) {
            toast.error(error.response.data.msg)
            setIsCurrentPasswordValid(false);
        }
    };

    const handleSave = async () => {
        if (newPassword === confirmPassword) {
            try {
                const response = await axios.patch(`${EmployeeUrl}/password-change`, {
                    userid,
                    password: newPassword,
                });

                if (response.status === 202) {
                    toast.success('password reset succesfully')
                    
                } else {
                    toast.error('some error occured')
                }
            } catch (error) {
                console.error("Error:", error);
                
            }
        } else {
            toast.error('password mismatch')
        }
        handleOpen()
    };

    return (
        <>
            <Dialog open={open} size="xs">
                <DialogHeader className="ms-3">Change password</DialogHeader>
                <DialogBody>
                    <div className="w-full p-3 flex flex-col gap-5">
                    <Input
                            label="Current password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Input
                            label="New password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onClick={checkPassword}
                        />
                        <Input
                            label="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSave} >
                        <span>Save</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default PasswordChangeModal

