import Tools from '../data/Tools';
import Tournament from '../data/Tournament';

class TournamentGenerator {
    constructor(teams, tournament_type) {
        this.teams = teams;
        this.tournament_type = tournament_type;
    }

    getTournament() {
        if(this.tournament_type == Tournament.TYPE_FREE_FOR_ALL) {
            return this.getFreeForAll();
        }
        else if(this.tournament_type == Tournament.TYPE_FULL) {
            return this.getFull();
        }
        else {
            return {};
        }
    }

    getFreeForAll() {
        this.teams = [];
        this.teams.push({1: 1});
        this.teams.push({2: 2});
        this.teams.push({3: 3});
        this.teams.push({4: 4});
        this.teams.push({5: 5});
        this.teams.push({6: 6});

        // https://en.wikipedia.org/wiki/Round-robin_tournament

        let results = [];
        let matches = [];
        let num_rounds = this.isEven(this.teams.length) ? (this.teams.length - 1) : (this.teams.length);
        let num_games_per_round = this.isEven(this.teams.length) ? (this.teams.length / 2) : ((this.teams.length - 1) / 2);

        for (let i = 0; i < this.teams.length - 1; i++) {
            for (let j = i + 1; j < this.teams.length; j++) {
                results.push({
                    team_1: this.teams[i],
                    team_2: this.teams[j]
                });
            }
        }

        for (i = 0; i < results.length; i++) {

        }

        console.log(results);

        return {
            type: this.tournament_type,
            teams: this.teams,
            matches: matches
        };
    }

    getFull() {
        return {
            type: this.tournament_type,
            teams: this.teams,
            matches: {}
        };
    }

    isEven(n) {
        return n % 2 == 0;
    }

    isOdd(n) {
        return Math.abs(n % 2) == 1;
    }
}

export default TournamentGenerator;