import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { TextField, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Member } from "./MemberClass";
import Autocomplete from '@mui/material/Autocomplete';
import nocoMembers from './nocoMembers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const displayedMember = new Member();

function SplashPage() {
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberPhoneNumber, setMemberPhoneNumber] = useState("");
    const [selectedMember, setSelectedMember] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        displayedMember._name = newValue.label
        displayedMember._email = newValue.email
        displayedMember._phoneNumber = newValue.phoneNumber
        console.log(displayedMember);

        setMemberName(newValue.label);
        setMemberEmail(newValue.email);
        setMemberPhoneNumber(newValue.phoneNumber);
    }


    function handleSubmit() {
        if (!memberName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail) || !memberPhoneNumber) {
            console.log("Can't submit form")
            handleOpen();
        } else {
            console.log("can submit")
            displayedMember._name = memberName;
            displayedMember._email = memberEmail;
            displayedMember._phoneNumber = memberPhoneNumber;

            //Add logic to add them to the database here
            //You could also convert the list of members to a set to remove duplicates and then convert it back. This might also sort it alphabetically.
            //I might want to add a modal that says you successfully submitted you sign in
            displayedMember.clear = "";
            console.log(displayedMember);

        }


    }

    return (
        <div id="wrapperDiv">

            <h1>Sign in!</h1>
                <Autocomplete
                disablePortal
                options={nocoMembers}
                sx={{ width: 300 }}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="Members" />}
            />
            <TextField
                error = {!memberName}
                id="standard-basic-name"
                label="Name"
                variant="standard"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
            />
            <TextField
                error= {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)}
                id="standard-basic-email"
                label="email@example.com"
                variant="standard"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
            />
            <TextField
                error={!memberPhoneNumber}
                id="standard-basic-phoneNumber"
                label="Phone Number"
                variant="standard"
                value={memberPhoneNumber}
                onChange={(e) => setMemberPhoneNumber(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>Submit!</Button>



            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Oopsies!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You need to fill out all sections of the form before you can submit it. Click out of this to return to the entry page
                    </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SplashPage />);
