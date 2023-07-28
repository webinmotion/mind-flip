import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ContentType = {
    PLAIN_TEXT: 'text/plain',
    HYPER_TEXT: 'text/html',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ManageGamePlacard({ placards, form, updatePlacards, handleChange, handleSelect, handleDelete }) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, minWidth: 120 },
            }}
            noValidate
            autoComplete="off"
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="placard_content">Content</InputLabel>
                    <OutlinedInput
                        id="placard_content"
                        aria-describedby="placard-content-error-text"
                        startAdornment={<InputAdornment position="start"><PersonalVideoIcon /></InputAdornment>}
                        label="Content"
                        value={form.placard_content}
                        onChange={handleChange}
                        required
                    />
                    <FormHelperText id="placard-content-error-text">
                        placard content is a required field
                    </FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="display_duration">Display duration</InputLabel>
                    <OutlinedInput
                        id="display_duration"
                        startAdornment={<InputAdornment position="start"><HourglassTopIcon /></InputAdornment>}
                        label="Display duration"
                        value={form.display_duration}
                        onChange={handleChange}
                        type='number'
                        required
                    />
                    <FormHelperText id="placard-content-error-text">
                        display duration is a required field
                    </FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="followed-by-helper-label">Followed By</InputLabel>
                    <Select
                        labelId="followed-by-helper-label"
                        name="followed_by"
                        value={form.followed_by}
                        label="Followed By"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {placards?.filter(plc => plc.placard_id !== form.placard_id).map(plc => <MenuItem key={plc.placard_id} value={plc.placard_id}>{plc.placard_content}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="content-type-helper-label">Content Type</InputLabel>
                    <Select
                        labelId="content-type-helper-label"
                        name="content_type"
                        value={form.content_type}
                        label="Content Type"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Object.values(ContentType).map(value =>
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <Button variant="contained" sx={{ mt: 2 }} fullWidth endIcon={<UpdateIcon />} onClick={updatePlacards}>Update</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, mt: 4 }} aria-label="table of existing placards">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Content</StyledTableCell>
                            <StyledTableCell align="left">Followed By</StyledTableCell>
                            <StyledTableCell align="right">Display duration&nbsp;(ms)</StyledTableCell>
                            <StyledTableCell align="left">Content Type</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placards?.map(({ placard_id, placard_content, display_duration, followed_by, content_type, }) => (
                            <StyledTableRow key={placard_id} sx={{ cursor: 'pointer' }} onClick={(event) => handleSelect(event, placard_id)}>
                                <StyledTableCell component="th" scope="row">
                                    <Tooltip title="Delete" arrow><Link sx={{ textDecoration: 'none' }} onClick={() => handleDelete(placard_id)}>{placard_content}</Link></Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="left">{placards.find(plc => plc.placard_id === followed_by)?.placard_content}</StyledTableCell>
                                <StyledTableCell align="right">{display_duration}</StyledTableCell>
                                <StyledTableCell align="left">{content_type}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}