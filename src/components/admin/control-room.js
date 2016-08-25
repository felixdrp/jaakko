import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// groups

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';



// Icons

import Memory from 'material-ui/svg-icons/hardware/memory';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class ControlRoom extends React.Component {

  render() {
    const style = {
      gray: {
        color: '#565555'
      }
    }
    return (
      <div>
        <AppBar
          title="Study Admin"
          iconElementLeft={<IconButton><Memory /></IconButton>}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />

        <Card
          style={{
            paddingBottom: 20,
          }}
        >
          <CardHeader
            title={ <span><IconButton><Group /></IconButton> Groups manager </span> }
            subtitle="Groups manager"
            // avatar="images/jsa-128.jpg"
          />
          <CardTitle
            title={
              <span>
                <Group style={style.gray} />
                <DeveloperBoard style={{...style.gray, marginRight: 10}} />
                Groups automated
              </span>
            }
            subtitle="Groups creation with AI help"
          />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardTitle
            title={
              <span>
                <Group style={style.gray} />
                <ModeEdit style={{...style.gray, marginRight: 10}} />
                Groups customization
              </span>
            }
            subtitle="Groups manual fine customization"
          />
          <RaisedButton
            // Unassigned Accounts
            label={
              <span>
                <PersonOutline style={{
                  color: '#6c6c6c',
                  position: 'relative',
                  top: 6,
                  marginRight: 7,
                }} />
                10
                <span
                  style={{
                    color: '#6c6c6c',
                    marginLeft: 15,
                  }}
                >
                  Unassigned Accounts
                </span>
              </span>
            }
            onClick={ () => console.log('onclik!!!!') }
            backgroundColor={'#efefef'}
            style={{
              minWidth: '95%',
              margin: '2.5%',
            }}
          />
          <div
            // Unassigned Chips
            style={{
              minWidth: '95%',
              margin: '2.5%',
              marginTop: 0,
            }}
          >
            <Chip
              backgroundColor={'#d6d6d6'}
              // onRequestDelete={ () => console.log('onclik!!!!') }
              onTouchTap={ () => console.log('onclik!!!!') }
              style={{
                margin: 3,
              }}
            >
              Colored Chip
            </Chip>
          </div>

          <div
            // Assign Groups
            // Groups Chips
            style={{
              minWidth: '95%',
              margin: '2.5%',
              marginTop: 65,
            }}
          >
            <RaisedButton
              label={
                <span>
                  <GroupAdd style={{
                    position: 'relative',
                    top: 6,
                    marginRight: 7,
                  }}/>
                  Add group
                </span>
              }
              onClick={ () => console.log('onclik!!!!') }
              backgroundColor={'#ddffb1'}
              style={{
                // minWidth: '95%',
                marginBottom: 20,
              }}
            />
            <Card
              style={{
                width: 460,
                paddingBottom: 15,
              }}
            >
              <RaisedButton
                label={
                  <span>
                    <Group
                      style={{
                        color: '#6c6c6c',
                        position: 'relative',
                        top: 6,
                        marginRight: 7,
                      }}
                    />
                    Group 1
                    <PersonOutline
                      style={{
                        color: '#6c6c6c',
                        position: 'relative',
                        top: 6,
                        marginLeft: 7,
                        marginRight: 7,
                      }}
                    />
                    10
                    <span
                      style={{
                        color: '#6c6c6c',
                        marginLeft: 15,
                      }}
                    >
                      Assigned Accounts
                    </span>
                  </span>
                }
                onClick={ () => console.log('onclik!!!!') }
                backgroundColor={'#f59999'}
                style={{
                  minWidth: '95%',
                  margin: '2.5%',
                }}
              />
              <div
                // Group 1 Chips
                style={{
                  minWidth: '95%',
                  margin: '2.5%',
                }}
              >
                <Chip
                  backgroundColor={'#efefef'}
                  onRequestDelete={ () => console.log('onclik!!!!') }
                  onTouchTap={ () => console.log('onclik!!!!') }
                  style={{
                    margin: 4,
                  }}
                >
                  Colored Chip
                </Chip>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    );
  }
}

export default ControlRoom;
