import Tools from '../data/Tools';
import Tournament from '../data/Tournament';

class TournamentGenerator {
    constructor(teams, tournament_type, num_groups) {
        this.teams = teams;
        this.tournament_type = tournament_type;
        this.num_groups = num_groups ? num_groups : 1;
    }

    getTournament() {
        if(this.tournament_type == Tournament.TYPE_FREE_FOR_ALL) {
            return this.getFreeForAll(this.teams);
        }
        else if(this.tournament_type == Tournament.TYPE_FULL) {
            return this.getFull(this.teams);
        }
        else {
            return {};
        }
    }

    getFreeForAll(playing_teams) {
        let results = [];
        let matches = [];
        let num_rounds = (playing_teams.length - 1);
        let num_games_per_round = this.isEven(playing_teams.length) ? (playing_teams.length / 2) : ((playing_teams.length - 1) / 2);
        let first_team = playing_teams[0];
        let teams = playing_teams;

        // https://en.wikipedia.org/wiki/Round-robin_tournament
        teams.shift();
        for (let i = 0; i < num_rounds; i++) {
            matches.push({
                team_1: first_team,
                team_2: teams[teams.length - 1]
            });
            for (let j = 1; j < num_games_per_round + 1; j++) {
                matches.push({
                    team_1: teams[j - 1],
                    team_2: teams[teams.length - 1 - j]
                });
            }

            results.push({
                round: i+1,
                matches: matches
            });

            matches = [];
            let moved_team = teams.pop();
            teams.unshift(moved_team);
        }

        return {
            type: this.tournament_type,
            teams: playing_teams,
            matches: results
        };
    }

    getFull(playing_teams) {
        playing_teams[0] = {1:1};
        playing_teams[1] = {2:2};
        playing_teams[2] = {3:3};
        playing_teams[3] = {4:4};
        playing_teams[4] = {5:5};
        playing_teams[5] = {6:6};
        let results = [];
        let groups = this.getGroups(playing_teams);

        for(let group = 0; group < groups.length; group++) {
            let free_for_all = this.getFreeForAll(groups[group]);
            results.push({
                group: (group + 1),
                teams: free_for_all.teams,
                matches: free_for_all.matches
            });
        }

        return {
            type: this.tournament_type,
            teams: playing_teams,
            matches: results
        };
    }

    getGroups(playing_teams) {
        let teams = JSON.parse(JSON.stringify(playing_teams));
        let teams_per_group = Math.ceil(teams.length / this.num_groups);
        let groups = [];
        let random_team_num = 0;

        for(let group = 0; group < this.num_groups; group++) {
            let new_group = [];
            for(let team = 0; team < teams_per_group; team++) {
                random_team_num = Tools.getRandomInt(0, teams.length - 1);
                if(typeof teams[random_team_num] !== "undefined") {
                    new_group.push(teams[random_team_num]);
                    teams.splice(random_team_num, 1);
                } // HERE IS CORRECTLY ADDED 6 TEAMS
            }
            // HERE ARE ONLY 2 TEAMS IN EACH GROUP
            // THERE IS PROBABLY SOME PROBLEM WITH COPYING ARRAY OF TEAMS

            console.log(new_group);
            groups.push(new_group);
        }

        return groups;
    }

    isEven(n) {
        return n % 2 == 0;
    }

    isOdd(n) {
        return Math.abs(n % 2) == 1;
    }
}

export default TournamentGenerator;