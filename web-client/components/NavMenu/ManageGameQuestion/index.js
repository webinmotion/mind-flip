import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import ScoreIcon from '@mui/icons-material/Score';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import ConstructionIcon from '@mui/icons-material/Construction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";

const GameCategory = {
    GENERAL: 'general',
    SCIENCE: 'science',
    GEOGRAPHY: 'geography',
    HISTORY: 'history',
    MUSIC: 'music',
    MOVIES: 'movies',
    TELEVISION: 'television',
    SPORTS: 'sports',
    FOOD: 'food',
    TRAVEL: 'travel',
    POLITICS: 'politics',
}

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

export default function ManageGameQuestion({ questions, queForm, choiceForm, updateQuestions, updateChoices, handleChange, handleQueSelected, handleChoiceSelected, handleDeleteChoice, handleChoiceChange, handleCorrectChecked, handleClueChecked, handleDeleteQue, handleChecked, handleDropdown, }) {

    const [expanded, setExpanded] = React.useState('');

    const handleToggle = (panel, que_id) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        handleQueSelected(que_id);
    };

    return (
        <>
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
                        <InputLabel htmlFor="que_value">Question</InputLabel>
                        <OutlinedInput
                            id="que_value"
                            aria-describedby="question-title-error-text"
                            startAdornment={<InputAdornment position="start"><PsychologyAltIcon /></InputAdornment>}
                            label="Question"
                            value={queForm.que_value}
                            onChange={handleChange}
                            required
                            multiline
                        />
                        <FormHelperText id="question-title-error-text">
                            The question is a required field
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="que_answer">Answer</InputLabel>
                        <OutlinedInput
                            id="que_answer"
                            startAdornment={<InputAdornment position="start"><GavelIcon /></InputAdornment>}
                            label="Answer"
                            value={queForm.que_answer}
                            onChange={handleChange}
                        />
                        <FormHelperText id="question-title-error-text">
                            The answer to a question is a required field
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="answer_reason">Reason</InputLabel>
                        <OutlinedInput
                            id="answer_reason"
                            startAdornment={<InputAdornment position="start"><ConstructionIcon /></InputAdornment>}
                            label="Brief reason for the answer"
                            value={queForm.answer_reason}
                            onChange={handleChange}
                            multiline
                        />
                        <FormHelperText id="question-title-error-text">
                            It helps to briefly explain why the answer is correct
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, }}>
                        <InputLabel htmlFor="max_points">Max Points</InputLabel>
                        <OutlinedInput
                            id="max_points"
                            startAdornment={<InputAdornment position="start"><ScoreIcon /></InputAdornment>}
                            label="Maximum points"
                            value={queForm.max_points}
                            onChange={handleChange}
                            type='number'
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, }}>
                        <InputLabel htmlFor="question-category-helper-label">Category</InputLabel>
                        <Select
                            labelId="question-category-helper-label"
                            name="category"
                            value={queForm.category}
                            label="Category"
                            onChange={handleDropdown}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.values(GameCategory).map(value =>
                                <MenuItem key={value} value={value}>{value}</MenuItem> )}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, }}>
                        <FormControlLabel control={<Checkbox name="has_choices" checked={queForm.has_choices} onChange={handleChecked} />}
                          label="Question has choices"
                          title='the question contains choices' />
                        <FormHelperText>
                            This will indicate whether a question contains choices or not.
                        </FormHelperText>
                    </FormControl>

                    <Button variant="contained" sx={{ mt: 2 }} fullWidth endIcon={<UpdateIcon />} onClick={updateQuestions}>Update Question</Button>
                </Box>
            </Box>

            <Box sx={{my: 2}}>
                {questions.map((que, i) => (
                    <Accordion key={que.que_id} expanded={expanded === `panel${i}`} onChange={handleToggle(`panel${i}`, que.que_id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${i}a-content`}
                            id={`panel${i}a-header`}
                        >
                            <Typography sx={{ width: '30px', flexShrink: 0 }}>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => handleDeleteQue(que.que_id)}>
                                        <MoreHorizIcon color={"primary"} fontSize={"small"} />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Typography sx={{ pt: 1 }}>{que.que_value}</Typography>
                        </AccordionSummary>
                        {queForm.has_choices && <AccordionDetails>
                            <Box component="form"
                                 sx={{
                                     '& .MuiTextField-root': { m: 1, width: '40ch' },
                                 }}
                                 noValidate
                                 autoComplete="off">
                                <div>
                                    <TextField
                                        error={false}
                                        id="choice_value"
                                        label="Choice"
                                        helperText=""
                                        value={choiceForm.choice_value}
                                        onChange={handleChoiceChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <ZoomInMapIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <FormGroup sx={{ mx: 1 }}>
                                        <FormControlLabel control={<Checkbox name={"is_correct"} onChange={handleCorrectChecked} value={choiceForm.is_correct} />} label="Correct choice" />
                                    </FormGroup>

                                    <FormGroup sx={{ mx: 1 }}>
                                        <FormControlLabel control={<Checkbox name={"has_clue"} onChange={handleClueChecked} value={choiceForm.has_clue} />} label="Add a clue?" />
                                    </FormGroup>

                                    {choiceForm.has_clue && <TextField
                                        error={false}
                                        id="clue"
                                        label="Clue"
                                        helperText=""
                                        value={choiceForm.clue}
                                        onChange={handleChoiceChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TroubleshootIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    }
                                </div>

                                <Button variant="contained" sx={{ mt: 2 }} fullWidth endIcon={<UpdateIcon />} onClick={updateChoices}>Add/Edit Choices</Button>
                            </Box>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700, mt: 4 }} aria-label="table of choices and clues">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Choice</StyledTableCell>
                                            <StyledTableCell align="left">Clue</StyledTableCell>
                                            <StyledTableCell align="right">is Correct</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {que?.choices.map(({ choice_id, choice_value, is_correct, clue, }) => (
                                            <StyledTableRow key={choice_id} sx={{ cursor: 'pointer' }} onClick={(event) => handleChoiceSelected(event, que.que_id, choice_id)}>
                                                <StyledTableCell component="th" scope="row">
                                                    <Tooltip title="Delete" arrow><Link sx={{ textDecoration: 'none' }} onClick={() => handleDeleteChoice(choice_id)}>{choice_value}</Link></Tooltip>
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{clue}</StyledTableCell>
                                                <StyledTableCell align="right">{is_correct && <CheckCircleIcon />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                        }
                    </Accordion> )
                )}
            </Box>
        </>
    );
}