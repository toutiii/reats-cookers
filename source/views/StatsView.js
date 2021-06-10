import React, {Component} from "react";
import {Text, View} from "react-native";
import {get_stats_data} from "../api/get_stats_data";
import all_constants from "../constants";

export default class StatsView extends Component{
    constructor(props) {
        super(props);
        this.statsData = get_stats_data().json.data;
    }
    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', marginBottom: '60%'}}>
                {
                    Object.keys(this.statsData).map((statKey) => {
                        return(
                            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, width: '95%'}}>
                                <View style={{flex: 3, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 18,  paddingLeft: '5%'}}>{all_constants.label.home[statKey]}</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 18}}>{this.statsData[statKey]}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
                    <Text style={{fontStyle: 'italic'}}> {all_constants.label.stats.automatic_message} </Text>
                </View>
            </View>
        )
    }

}