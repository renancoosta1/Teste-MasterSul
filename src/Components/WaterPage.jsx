import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

export default function WaterPage() {
    const [caixaPrincipal, setCaixaPrincipal] = useState({
        sensorPrimario: 1,
        sensorSecundario: 1,
    });

    const [caixaSecundaria, setCaixaSecundaria] = useState({
        sensorPrimario: 1,
        sensorSecundario: 1
    });

    const [valvula, setValvula] = useState(false);
    const [bomba, setBomba] = useState(false);

    const handleChangeCaixaPrincipal = (event) => {
        const { name, value } = event.target;

        setCaixaPrincipal((prev) => {
          const newValues = { ...prev, [name]: value };

          if (newValues.sensorPrimario === 0 && newValues.sensorSecundario === 0)
            setValvula(true);
          else if (newValues.sensorPrimario === 0 && newValues.sensorSecundario === 1 && valvula)
            setValvula(true);
          else 
            setValvula(false);

          if (newValues.sensorPrimario === 1 && newValues.sensorSecundario === 1 && caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 0)
            setBomba(true);
          else if (newValues.sensorPrimario === 0 && newValues.sensorSecundario === 0 && caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 0)
            setBomba(false);

          return newValues;
        });
    };

    const handleChangeCaixaSecundaria = (event) => {
        const { name, value } = event.target;

        setCaixaSecundaria((prev) => {
          const newValues = { ...prev, [name]: value };

          if (
                newValues.sensorPrimario === 0 && newValues.sensorSecundario === 0 && caixaPrincipal.sensorPrimario === 1 
            )
            setBomba(true);
          else if (newValues.sensorPrimario === 0 && newValues.sensorSecundario === 1 && bomba)
            setBomba(true);
          else if (newValues.sensorPrimario === 1 && newValues.sensorSecundario === 1)
            setBomba(false);
          else if (
                ((newValues.sensorPrimario === 0 && newValues.sensorSecundario === 1) || (newValues.sensorPrimario === 1 && newValues.sensorSecundario === 1))
                && caixaPrincipal.sensorPrimario === 0 && caixaPrincipal.sensorSecundario === 0
            )
            setBomba(false);
          else
            setBomba(false);

          if (caixaPrincipal.sensorPrimario === 0 && !valvula && newValues.sensorPrimario === 0 && newValues.sensorSecundario === 0)
            setValvula(true);

          return newValues;
        });
    };
    
    const calculateBarProgress = (caixa) => {
        let percentProgress = 0;

        if (caixa === "primaria") {
            if ((caixaPrincipal.sensorPrimario === 1 && caixaPrincipal.sensorSecundario === 1) || (caixaPrincipal.sensorPrimario === 1 && caixaPrincipal.sensorSecundario === 0))
                percentProgress = 100;
            else if (caixaPrincipal.sensorPrimario === 0 && caixaPrincipal.sensorSecundario === 1)
                percentProgress = 50;
            else 
                percentProgress = 0;
        } else {
            if ((caixaSecundaria.sensorPrimario === 1 && caixaSecundaria.sensorSecundario === 1) || (caixaSecundaria.sensorPrimario === 1 && caixaSecundaria.sensorSecundario === 0))
                percentProgress = 100;
            else if (caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 1)
                percentProgress = 50;
            else 
                percentProgress = 0;
        }

        return percentProgress;
    }

    return (
        <>
            <span>Caixa Principal</span>
            <div className='flex my-5'>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl className='w-52'>
                        <InputLabel id="sensorPrimario">Sensor Primário</InputLabel>
                        <Select
                        labelId="sensorPrimario"
                        name="sensorPrimario"
                        value={caixaPrincipal.sensorPrimario}
                        label="Sensor Primário"
                        onChange={handleChangeCaixaPrincipal}
                        >
                        <MenuItem value={0}>Desativado</MenuItem>
                        <MenuItem value={1}>Ativado</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        {caixaPrincipal.sensorPrimario === 1
                            ? <span>TEM AGUA</span>
                            : <span>NÃO TEM AGUA</span>
                        }
                    </Box>
                </Box>
                <Box sx={{ minWidth: 120 }} marginLeft={3}>
                    <FormControl className='w-52'>
                        <InputLabel id="sensorSecundario">Sensor Secundário</InputLabel>
                        <Select
                        labelId="sensorSecundario"
                        name="sensorSecundario"
                        value={caixaPrincipal.sensorSecundario}
                        label="Sensor Secundário"
                        onChange={handleChangeCaixaPrincipal}
                        >
                        <MenuItem value={0}>Desativado</MenuItem>
                        <MenuItem value={1}>Ativado</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        {(caixaPrincipal.sensorPrimario === 1 || caixaPrincipal.sensorPrimario === 0) && caixaPrincipal.sensorSecundario === 1
                            ? <span>TEM AGUA</span>
                            : caixaPrincipal.sensorPrimario === 0 &&  caixaPrincipal.sensorSecundario === 0
                            ? <span>NÃO TEM AGUA</span>
                            : <span>SENSOR COM DEFEITO</span>
                        }
                    </Box>
                </Box>
            </div>

            <span>Caixa Secundária</span>
            <div className='flex my-5'>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl className='w-52'>
                        <InputLabel id="sensorPrimario">Sensor Primário</InputLabel>
                        <Select
                        labelId="sensorPrimario"
                        name="sensorPrimario"
                        value={caixaSecundaria.sensorPrimario}
                        label="Sensor Primário"
                        onChange={handleChangeCaixaSecundaria}
                        >
                        <MenuItem value={0}>Desativado</MenuItem>
                        <MenuItem value={1}>Ativado</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        {caixaSecundaria.sensorPrimario === 1
                            ? <span>TEM AGUA</span>
                            : <span>NÃO TEM AGUA</span>
                        }
                    </Box>
                </Box>
                <Box sx={{ minWidth: 120 }} marginLeft={3}>
                    <FormControl className='w-52'>
                        <InputLabel id="sensorSecundario">Sensor Secundário</InputLabel>
                        <Select
                        labelId="sensorSecundario"
                        name="sensorSecundario"
                        value={caixaSecundaria.sensorSecundario}
                        label="Sensor Secundário"
                        onChange={handleChangeCaixaSecundaria}
                        >
                        <MenuItem value={0}>Desativado</MenuItem>
                        <MenuItem value={1}>Ativado</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        {(caixaSecundaria.sensorPrimario === 1 || caixaSecundaria.sensorPrimario === 0) && caixaSecundaria.sensorSecundario === 1
                            ? <span>TEM AGUA</span>
                            : caixaSecundaria.sensorPrimario === 0 &&  caixaSecundaria.sensorSecundario === 0
                            ? <span>NÃO TEM AGUA</span>
                            : <span>SENSOR COM DEFEITO</span>
                        }
                    </Box>
                </Box>
            </div>

            <div className='flex justify-around mt-32'>
                <div className='w-28 text-yellow-700 font-semibold'>
                    V1 - {valvula ? "LIGADA" : "DESLIGADA"}
                    <FormControlLabel control={<Switch checked={valvula} />}/>
                </div>

                <div className='flex border border-sky-500 w-96 h-72 flex-col'>
                    <div className="bar-container">
                        <div className="bar" style={{height: `${calculateBarProgress("primaria")}%`}}></div>
                    </div>
                    <span className='text-yellow-700 font-semibold'>
                        {caixaPrincipal.sensorPrimario === 0 && caixaPrincipal.sensorSecundario === 1 && !valvula
                            ? "CAIXA ESVAZIANDO" 
                            : caixaPrincipal.sensorPrimario === 0 && caixaPrincipal.sensorSecundario === 0
                            ? "CAIXA VAZIA"
                            : caixaPrincipal.sensorPrimario === 0 && caixaPrincipal.sensorSecundario === 1 && valvula
                            ? "CAIXA ENCHENDO"
                            : "CAIXA CHEIA"
                        }
                    </span>
                </div>

                <div className='w-28 text-yellow-700 font-semibold'>
                    B1 - {bomba ? "LIGADA" : "DESLIGADA"}
                    <FormControlLabel control={<Switch checked={bomba} />}/>
                </div>

                <div className='flex border border-sky-500 w-96 h-72 flex-col'>
                    <div className="bar-container">
                        <div className="bar" style={{height: `${calculateBarProgress()}%`}}></div>
                    </div>
                    <span className='text-yellow-700 font-semibold'>
                        {caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 1 && !bomba
                            ? "CAIXA ESVAZIANDO" 
                            : caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 0
                            ? "CAIXA VAZIA"
                            : caixaSecundaria.sensorPrimario === 0 && caixaSecundaria.sensorSecundario === 1 && bomba
                            ? "CAIXA ENCHENDO"
                            : "CAIXA CHEIA"
                        }
                    </span>
                </div>
            </div>
        </>
    )
}
