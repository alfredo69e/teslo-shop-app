import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Button, ListItemButton } from '@mui/material';
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from 'react';
import { UIContext } from '../../../context';
import { useRouter } from 'next/router';


export const DrawerMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UIContext );

    const { push } = useRouter();

    const [searchTerm, setSearchTerm] = useState('')

    const navigateTo = ( value: string ) => {
        toggleSideMenu( false );
        push( value );
        setSearchTerm('');
    }

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo( `/search/${searchTerm}` );
    }
    
  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(5px)', transition: 'all 0.5s ease-out' }}
        onClose={ () => toggleSideMenu( false ) }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        type='text'
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={ ({ target }) => setSearchTerm( target.value ) }
                        onKeyPress={ ({ key }) => ( key === 'Enter') ? onSearchTerm() : null }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItemButton >
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton>


                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo( '/category/men' ) }>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo( '/category/women' ) }>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo( '/category/kid' ) }>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItemButton>


                <ListItemButton >
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ingresar'} />
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Salir'} />
                </ListItemButton>


                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItemButton >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItemButton>
            </List>
        </Box>
    </Drawer>
  )
}