import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TocIcon from '@mui/icons-material/Toc';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
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

export default function ManageGameClock({ clocks, form, updateClocks, handleChange, handleSelect, handleDelete }) {

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
                    <InputLabel htmlFor="clock_id">ID</InputLabel>
                    <OutlinedInput
                        id="clock_id"
                        aria-describedby="clock-id-error-text"
                        startAdornment={<InputAdornment position="start"><FingerprintIcon /></InputAdornment>}
                        label="ID"
                        value={form.clock_id}
                        onChange={handleChange}
                        type='number'
                        required
                    />
                    <FormHelperText id="clock-id-error-text">
                        clock id is a required field
                    </FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="clock_title">Title</InputLabel>
                    <OutlinedInput
                        id="clock_title"
                        aria-describedby="clock-title-error-text"
                        startAdornment={<InputAdornment position="start"><TocIcon /></InputAdornment>}
                        label="Title"
                        value={form.clock_title}
                        onChange={handleChange}
                        required
                    />
                    <FormHelperText id="clock-title-error-text">
                        clock title is a required field
                    </FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="pre_countdown_delay">Pre Countdown delay</InputLabel>
                    <OutlinedInput
                        id="pre_countdown_delay"
                        startAdornment={<InputAdornment position="start"><HourglassFullIcon /></InputAdornment>}
                        label="Pre Countdown delay"
                        value={form.pre_countdown_delay}
                        onChange={handleChange}
                        type='number'
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="countdown_duration">Countdown Duration</InputLabel>
                    <OutlinedInput
                        id="countdown_duration"
                        startAdornment={<InputAdornment position="start"><HourglassTopIcon /></InputAdornment>}
                        label="Countdown Duration"
                        value={form.countdown_duration}
                        onChange={handleChange}
                        type='number'
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, }}>
                    <InputLabel htmlFor="post_countdown_delay">Post Countdown delay</InputLabel>
                    <OutlinedInput
                        id="post_countdown_delay"
                        startAdornment={<InputAdornment position="start"><HourglassEmptyIcon /></InputAdornment>}
                        label="Post Countdown delay"
                        value={form.post_countdown_delay}
                        onChange={handleChange}
                        type='number'
                    />
                </FormControl>

                <Button variant="contained" sx={{ mt: 2 }} fullWidth endIcon={<UpdateIcon />} onClick={updateClocks}>Update</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, mt: 4 }} aria-label="table of existing clocks">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Game Clock/Clock</StyledTableCell>
                            <StyledTableCell align="right">Title</StyledTableCell>
                            <StyledTableCell align="right">Pre Coutdown delay&nbsp;(ms)</StyledTableCell>
                            <StyledTableCell align="right">Countdown duration&nbsp;(ms)</StyledTableCell>
                            <StyledTableCell align="right">Post Countdown delay&nbsp;(ms)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clocks.map(({ clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay }) => (
                            <StyledTableRow key={clock_id} sx={{ cursor: 'pointer' }} onClick={(event) => handleSelect(event, clock_id)}>
                                <StyledTableCell component="th" scope="row">
                                    <Tooltip title="Delete" arrow><Button onClick={() => handleDelete(clock_id)}>{clock_id}</Button></Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="left">{clock_title}</StyledTableCell>
                                <StyledTableCell align="right">{pre_countdown_delay}</StyledTableCell>
                                <StyledTableCell align="right">{countdown_duration}</StyledTableCell>
                                <StyledTableCell align="right">{post_countdown_delay}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}