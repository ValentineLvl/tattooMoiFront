import React, { Component, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// @ts-expect-error
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

export default class AgendaScreen extends Component {
  state = { //Exemple d'évènement
    items: { "2021-12-09": [{name: "Exemple d'évènement \nJ'ai rendez à 10h00", height: 10}]}
  };
  // item { YYYY-MM-DD: [{name, height }]}

  async _getData (userV, passwordV) { // Mettre les valeurs dans les states
    const url = '' //mettre le lien URL de l'API
    return fetch(url, {
            method: 'POST', // mettre la méthode du requête
            headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
            },
          })
    .then((response) => this.setState({ item: response.json() })) // changer l'objet si nécessaire
    .catch((error) => console.error(error))
  }

  componentDidMount(){
    //_getData() // Récupéré par le backend
  }


  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        showClosingKnob={true}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        //monthFormat={'yyyy'}
        theme={calendarStyle}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      //hideExtraDays={false}
      />
    );
  }
 
  loadItems(day) {
    console.log(this)
    setTimeout(() => {
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        /* testID={testIDs.agenda.ITEM} */
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const calendarStyle = {

  /* HEADER */
  calendarBackground: '#F1EFE5',
  agendaKnobColor: '#C2A77D', // SLIDER
  /* - Intérieur -*/
  textSectionTitleColor: 'black', // Nom des jours
  dayTextColor: 'black', // numéro des jours
  textSectionTitleDisabledColor: '#d9e1e8', // jours désactivé
  selectedDayBackgroundColor: '#C2A77D', // Selection rond
  selectedDayTextColor: 'white', // Date sélectionnée blanc
  todayTextColor: '#C2A77D',
  dotColor: '#C2A77D', // point d'évènement
  textDayFontWeight: 400,

  /* CONTENT */
  backgroundColor: '#C2A77D',
  indicatorColor: 'black', // icon chargement
  agendaDayTextColor: "black",
  agendaDayNumColor: 'black',
  agendaTodayColor: 'white',
}
/*
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
*/