import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { TextField, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Member } from "./MemberClass";
import Autocomplete from '@mui/material/Autocomplete';

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
    const [openErr, setOpenErr] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [membersArr, setMembersArr] = useState([]);
    const [atendees, setAtendees] = useState([]);
    const memberJSON = require("./nocoMembers.json");

    
    const handleOpenErr = () => setOpenErr(true);
    const handleCloseErr = () => setOpenErr(false);

    const handleOpenSuccess = () => setOpenSuccess(true);
    const handleCloseSuccess = () => setOpenSuccess(false);

    useEffect(() => {
        setMembersArr(memberJSON); 
    })

    const handleChange = (event, newValue, reason) => {
        if (reason === "clear") {
            newValue = {label: "", email: "", phoneNumber: ""}
        }
        displayedMember._name = newValue.label
        displayedMember._email = newValue.email
        displayedMember._phoneNumber = newValue.phoneNumber

        setMemberName(newValue.label);
        setMemberEmail(newValue.email);
        setMemberPhoneNumber(newValue.phoneNumber);
    }

    function createAttendanceFile() {
        const jsonData = JSON.stringify(atendees);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const date = new Date();

            //Create a link element, turn the href into a download link, name the file
        const a = document.createElement("a");
        a.href = url;
        let dateStr = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "_Attendance";
        a.download = dateStr;
        //then click the download link
        a.click();

        // Clean up by revoking the URL object
        URL.revokeObjectURL(url);
    }

    function createMemberDB() {
        const jsonData = JSON.stringify(membersArr);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

            //Create a link element, turn the href into a download link, name the file
        const a = document.createElement("a");
        a.href = url;
        a.download = "./nocoMembers.json";
        //then click the download link
        a.click();

        // Clean up by revoking the URL object
        URL.revokeObjectURL(url);
        createAttendanceFile();
    }

    function handleSubmit() {
        if (!memberName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail) || !memberPhoneNumber) {
            console.log("Can't submit form")
            handleOpenErr();
        } else {
            displayedMember._name = memberName;
            displayedMember._email = memberEmail;
            displayedMember._phoneNumber = memberPhoneNumber;

            let displayedMemberconvert = {label: displayedMember._name, email: displayedMember._email, phoneNumber: displayedMember._phoneNumber } //convert the current member to expected format
            let isDupeBool = false;
            for (let i = 0; i < membersArr.length; i++) {
                if (membersArr[i].label == displayedMemberconvert.label) {
                    isDupeBool = true
                }
            }
    
            if (!isDupeBool) {
                membersArr.push(displayedMemberconvert);
            }
            
            membersArr.sort((a, b) =>
                a.label[0].localeCompare(b.label[0])
            )

            atendees.push(displayedMemberconvert);

            atendees.sort((a, b) =>
                a.label[0].localeCompare(b.label[0])
            )
            
            //I might want to add a modal that says you successfully submitted you sign in
            handleOpenSuccess();
            displayedMember.clear = "";
        }
    }

    return (
        <div id="wrapperDiv">

            <h1>Sign in!</h1>
            {/* When the x is clicked it's trying to assign label val to null so just change that to empty */}
            <div id="autocompleteDiv">
                <Autocomplete
                disablePortal
                options={membersArr}
                sx={{ width: "30%" }} 
                onChange={handleChange}
                renderInput={(params) => <TextField sx = {{input: {color: "white"}, background: {color: "white"}}} {...params} label="Members" />}
            />
            </div>
            <div id="firstRowInputs">

                <TextField
                    error = {!memberName}
                    id="standard-basic-name"
                    label="Name"
                    variant="standard"
                    value={memberName}
                    sx = {{paddingRight: "3%", width: "20%"}}
                    onChange={(e) => setMemberName(e.target.value)}
                    color="white"
                />
                <TextField
                    error= {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)}
                    id="standard-basic-email"
                    label="email@example.com"
                    variant="standard"
                    value={memberEmail}
                    sx = {{ paddingRight: "3%", width: "20%"}}
                    onChange={(e) => setMemberEmail(e.target.value)}
                />
                <TextField
                    error={!memberPhoneNumber}
                    id="standard-basic-phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    value={memberPhoneNumber}
                    sx = {{paddingRight: "3%", width: "20%"}}
                    onChange={(e) => setMemberPhoneNumber(e.target.value)}
                />
            </div>

            <div id="submitButtonDiv">
                <Button variant="contained" onClick={handleSubmit}>Submit!</Button>
            </div>

            <div id="endDayButtonDiv">
                <Button variant="contained" sx={{width: "20%", background: "#c22f3b"}} onClick={createMemberDB}>Save Attendance!</Button>
            </div>



            <div>
                <Modal
                    open={openErr}
                    onClose={handleCloseErr}
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


            <div>
                <Modal
                    open={openSuccess}
                    onClose={handleCloseSuccess}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thank you!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You have successfully signed in to today's NocoNet Meeting!
                    </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SplashPage />);
