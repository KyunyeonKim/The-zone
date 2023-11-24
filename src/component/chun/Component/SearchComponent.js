import React, { Component } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";

const styles=(theme)=>({
    button :{
        height:"100%",
        fontSize:'1rem'
    },
    textField:{
        width:"300px"
    }
});


class SearchComponent extends Component {

    render() {
        const { classes,searchKeyword, onSearchButtonClick, onSearchKeywordChange } = this.props;

        return (
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Box component="span" style={{ marginRight: '10px'}}>
                        <TextField className={classes.textField}
                            id="outlined-basic"
                            label="검색할 사원 명/사원번호(최대 12자리)"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={(e) => onSearchKeywordChange(e.target.value)
                            }
                        />
                    </Box>
                    <Box component="span">
                        <Button className={classes.button} variant="outlined" onClick={onSearchButtonClick} >
                            검색
                        </Button>
                    </Box>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SearchComponent);