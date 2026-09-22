import { useState } from "react";
import { Avatar, Box, Button, Card, CardContent, Chip, Container, Divider, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Alex Morgan", occupation: "Operations Administrator", email: "alex.morgan@opsplatform.com", phone: "+1 (555) 014-2098", location: "New York, United States" });
  const [draft, setDraft] = useState(profile);

  const startEditing = () => { setDraft(profile); setEditing(true); };
  const cancelEditing = () => setEditing(false);
  const saveProfile = () => { setProfile(draft); setEditing(false); };

  return <Container maxWidth="lg" className="page-container">
  <Box className="profile-heading">
    <Typography variant="overline" color="primary" className="page-kicker">ACCOUNT</Typography>
    <Typography variant="h3" className="page-title">My Profile</Typography>
    <Typography color="text.secondary">Manage your personal information and account preferences.</Typography>
  </Box>

  <Card className="profile-main-card">
    <Box className="profile-cover">
      <Box className="profile-cover-pattern" />
    </Box>
    <CardContent className="profile-content">
      <Box className="profile-top">
        <Avatar src="https://i.pravatar.cc/300?img=12" alt="Alex Morgan" className="profile-image" />
        {!editing ? <Button variant="outlined" startIcon={<EditOutlinedIcon />} onClick={startEditing} className="profile-edit">Edit profile</Button> : <Box className="profile-edit-actions"><Button variant="outlined" onClick={cancelEditing}>Cancel</Button><Button variant="contained" onClick={saveProfile}>Save</Button></Box>}
      </Box>

      <Box className="profile-identity">
        {editing ? <Box className="profile-edit-fields"><TextField fullWidth label="Name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /><TextField fullWidth label="Occupation" value={draft.occupation} onChange={(event) => setDraft({ ...draft, occupation: event.target.value })} /></Box> : <><Typography variant="h4" className="profile-name">{profile.name}</Typography><Typography color="primary" className="profile-role">{profile.occupation}</Typography></>}
        <Chip label="Active account" color="success" size="small" className="profile-status" />
      </Box>

      <Divider className="profile-divider" />

      <Box className="profile-sections">
        <Card variant="outlined" className="profile-section-card"><CardContent className="profile-section-content">
          <Typography variant="overline" color="text.secondary" className="profile-section-title">CONTACT INFORMATION</Typography>
          {editing ? <Box className="profile-edit-fields"><TextField fullWidth label="Email address" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /><TextField fullWidth label="Phone number" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /><TextField fullWidth label="Location" value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} /></Box> : <><Box className="profile-info-row"><Box className="profile-info-icon"><EmailOutlinedIcon color="primary" /></Box><Box><Typography variant="caption" color="text.secondary">Email address</Typography><Typography>{profile.email}</Typography></Box></Box><Box className="profile-info-row"><Box className="profile-info-icon"><PhoneOutlinedIcon color="primary" /></Box><Box><Typography variant="caption" color="text.secondary">Phone number</Typography><Typography>{profile.phone}</Typography></Box></Box><Box className="profile-info-row"><Box className="profile-info-icon"><LocationOnOutlinedIcon color="primary" /></Box><Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography>{profile.location}</Typography></Box></Box></>}
        </CardContent></Card>
        <Card variant="outlined" className="profile-section-card"><CardContent className="profile-section-content">
          <Typography variant="overline" color="text.secondary" className="profile-section-title">ACCOUNT SUMMARY</Typography>
          <Box className="profile-summary-grid">
            <Box className="profile-stat"><Typography variant="h5" color="primary" className="dashboard-stat-value">24</Typography><Typography variant="body2" color="text.secondary">Orders managed</Typography></Box>
            <Box className="profile-stat profile-stat-success"><Typography variant="h5" color="success.main" className="dashboard-stat-value">98%</Typography><Typography variant="body2" color="text.secondary">Profile complete</Typography></Box>
          </Box>
          <Box className="profile-info-row"><Box className="profile-info-icon"><CalendarMonthOutlinedIcon color="primary" /></Box><Box><Typography variant="caption" color="text.secondary">Member since</Typography><Typography>January 2024</Typography></Box></Box>
        </CardContent></Card>
      </Box>
    </CardContent>
  </Card>
  </Container>;
};

export default Profile;