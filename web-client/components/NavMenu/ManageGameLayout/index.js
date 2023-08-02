import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import {GameCategory} from "../../App/Constants";
import SortableTable from '../SortableTable';
import TextField from "@mui/material/TextField";

export default function ManageGameLayout({games, form, questions, head, criteria, editable, setEditable, handleSelected, handleChangeCriteria, handleCheckCriteria, applyLayout,}) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 2, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <FormControl fullWidth>
                    <InputLabel id="select-game-label">Game ID</InputLabel>
                    <Select
                        labelId="select-game-label"
                        name="game_id"
                        value={form.game_id}
                        label="Game ID"
                        onChange={handleSelected}
                    >
                        {games?.length > 0
                            ? games.map(({game_info}) => <MenuItem key={game_info?.game_id} value={game_info?.game_id}>{game_info?.title}</MenuItem>)
                            : <MenuItem>{"No games available"}</MenuItem>
                        }
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>
            </div>

            <div>
                <label style={{marginTop: '15px', display: 'inline-block'}} htmlFor={"from_anyone_check"}>
                    <Checkbox aria-label={"show all questions"} id="from_anyone_check" name="from_anyone" value={criteria.from_anyone.selected} title='questions asked by anyone' onChange={handleCheckCriteria}  />
                    Show all questions
                </label>
            </div>

            <div>
                <label style={{marginTop: '15px', display: 'inline-block'}} htmlFor={"game_category_check"}>
                    <Checkbox aria-label={"filter by category"} id="game_category_check" name="game_category" value={criteria.game_category.selected} title='apply category filter' onChange={handleCheckCriteria} />
                    Filter by Category
                </label>

                {criteria.game_category.selected && <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="game_category-label">Category</InputLabel>
                    <Select
                        labelId="game_category-label"
                        name="game_category"
                        value={criteria.game_category.value}
                        label="Game Category"
                        onChange={handleChangeCriteria}
                    >
                        {Object.entries(GameCategory).map(([key, value]) =>
                            <MenuItem key={key} value={value}>{key}</MenuItem>)}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>
                }
            </div>

            <div>
                <label style={{marginTop: '20px', display: 'inline-block'}} htmlFor={"keyword_search_input"}>
                    <Checkbox aria-label={"filter by keyword"} id="keyword_search_input" name="keyword_search" value={criteria.keyword_search.selected} title='apply keyword filter' onChange={handleCheckCriteria} />
                    Filter by keyword
                </label>

                {criteria.keyword_search.selected && <TextField
                    error={false}
                    id="keyword-helper-text"
                    name={"keyword_search"}
                    label="Keyword Search"
                    placeholder="Keyword"
                    value={criteria.keyword_search.value}
                    helperText=""
                    onChange={handleChangeCriteria}
                />
                }
            </div>

            <SortableTable title={'Available Questions'} head={head} rows={questions} editable={editable} setEditable={setEditable} />

            <Box sx={{my: 2}}>
                <Button variant="contained" fullWidth endIcon={<UpdateIcon/>} onClick={applyLayout}>Update</Button>
            </Box>

        </Box>
    );
}