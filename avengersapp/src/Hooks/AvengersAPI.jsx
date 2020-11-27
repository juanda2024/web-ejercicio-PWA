import React, {  useState } from "react";
import { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import md5 from 'md5';

const public_key_avengers = "72fbb554e7f4d44c62768b9d8f98a206";
const private_key_avengers = "051c4877bee2173d9d231ea29c4b6311954e11e6";

const styles = theme => ({
    drawerPaper: { background: "white" }
});

function AvengersAPI() {
    
    const [avengers, setAvengers] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("avengers") === null) {
                setAvengers("Loading...")
            } else {
                setAvengers(localStorage.getItem("avengers"));
            }
        } else {
            const url = new URL("https://gateway.marvel.com/v1/public/characters?");
            let generated_hash = md5("API"+private_key_avengers+public_key_avengers);
            let params = {
                ts:"API",
                hash: generated_hash,
                apikey: public_key_avengers

            };
            url.search = new URLSearchParams(params);
            fetch(url).then(res=>res.json()).then(res=>{
                setAvengers(res.data.results);
                localStorage.setItem("avengers", JSON.stringify(res.data.results));
            })
        }
    }, []);
    const classes = styles;
    return (
        <div>
            <h1>PERSONAJES UNIVERSO MARVEL</h1>
          {avengers.map((superheroe_actual) =>{
              return(
            <div>
                <Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Paper>
                                <CardMedia
                                component="img"
                                alt="Super"
                                height = "400"
                                image={superheroe_actual.thumbnail.path +"/portrait_xlarge."+ superheroe_actual.thumbnail.extension}
                                title="Super"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <CardMedia
                                component="img"
                                alt="Marvel"
                                height = "400"
                                image="https://lh3.googleusercontent.com/proxy/3sG34i5Ce0qcmtOjynwd8hH4FLMSoTHQsjF4wX8-rYlPu8hw4jCFKo_I1Q3kcCyhN2AUx-F0_cK4RHJMpElV0pkGVC5x_RWWmi9_Wahe7YK4ITWwyIb3A-yZxWM7kGkk7yiOTna1"
                                title="Marvel"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3" color="initial">
                        {superheroe_actual.name}
                      </Typography>
                      <Typography variant="subtitle1" color="initial">
                        {superheroe_actual.description}
                      </Typography>
                     </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="h6" color="initial">
                            {superheroe_actual.series.items.length !== 0 && (
                                <Typography variant="subtitle1" color="initial">
                                     <br></br>
                                     Ha tendio apariciones en las siguiente series:
                                    {superheroe_actual.series.items.map((elemento) => (
                                        <Typography variant="subtitle1" color="initial">
                                            - {elemento.name}
                                        </Typography>
                            ))}
                                </Typography>
                            )}
                            {superheroe_actual.series.items.length === 0 && (
                                <Typography variant="subtitle1" color="initial">
                                    Este personaje no tiene apariciones registradas.
                                </Typography>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
              </div>
              );
          })}
        </div>
    );
  }
  
  export default AvengersAPI;