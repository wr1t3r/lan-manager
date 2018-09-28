import Tools from '../data/Tools';

class TeamGenerator {
    constructor(players, num_players) {
        this.players = players;
        this.num_players = num_players;
    }

    getRandomTeams() {
        let num_teams = Math.ceil(Object.keys(this.players).length / this.num_players);
        let players = JSON.parse(JSON.stringify( this.players ));
        let teams = [];

        for (let curr_team = 0; curr_team < num_teams; curr_team++) {
            let team = {};

            for (let curr_player = 0; curr_player < this.num_players; curr_player++) {
                let random_player = this.getRandomPlayer(players);

                team[random_player.steam_id] = random_player;

                Object.keys(players).forEach(function(key){
                    if(random_player.steam_id === key) {
                        delete players[key];
                    }
                });
            }

            teams.push(team);
        }

        return teams;
    }

    getRandomPlayer(players) {
        let counter = 0;
        let random_num = Tools.getRandomInt(0, (Object.keys(players).length - 1) );
        let random_player = {};

        Object.keys(players).forEach(function(key){
            if(counter === random_num) {
                random_player = players[key];
            }
            counter++;
        });

        return random_player;
    }
}

export default TeamGenerator;
