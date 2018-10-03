import Tools from '../data/Tools';
import Tournament from '../data/Tournament';

class TournamentGenerator {
    constructor(teams, tournament_type, num_groups) {
        this.teams = teams;
        this.tournament_type = tournament_type;
        this.num_groups = num_groups ? num_groups : 1;
    }

    getTournament() {
        this.teams = [
            {
                76561198862409907: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "76561198862409907",
                    username: "1",
                },
                498498: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "498498",
                    username: "2",
                },
            },
            {
                76561198862409907: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "76561198862409907",
                    username: "3",
                },
                498498: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "498498",
                    username: "4",
                },
            },
            {
                76561198862409907: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "76561198862409907",
                    username: "5",
                },
                498498: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "498498",
                    username: "6",
                },
            },
            {
                76561198862409907: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "76561198862409907",
                    username: "7",
                },
                498498: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "498498",
                    username: "8",
                }
            },
            {
                76561198862409907: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "76561198862409907",
                    username: "9",
                },
                498498: {
                    avatar_link: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
                    link: "https://steamcommunity.com/profiles/76561198862409907/",
                    steam_id: "498498",
                    username: "10",
                }
            }
        ];

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

    generateRoundRobin(num_teams) {
        if (num_teams % 2 == 0)
            return this.generateRoundRobinEven(num_teams);
        else
            return this.generateRoundRobinOdd(num_teams);
    }

    generateRoundRobinEven(num_teams) {
        // Generate the result for one fewer teams.
        let results = this.generateRoundRobinOdd(num_teams - 1);

        let results2 = [];
        for (let team = 0; team < num_teams - 1; team++) {
            for (let round = 0; round < num_teams - 1; round++) {
                let team_index = this.getNoOpponentIndex(results, round, team);
                if(team_index !== "") {
                    results2[team_index] = {
                        round: round,
                        team_1: num_teams - 1,
                        team_2: team,
                    };
                } else {
                    let old_team = this.getTeamFromRound(results, round, team);
                    results2[old_team.team_index] = old_team.team;
                }
            }
        }

        return results2;
    }

    getTeamFromRound(robin_teams, round, team_nr) {
        let team = {};
        let team_index = "";

        for(let i = 0; i < robin_teams.length; i++) {
            if(robin_teams[i].round == round) {
                //console.log(robin_teams[i].team_1, robin_teams[i].team_2);
                if(robin_teams[i].team_1 === team_nr || robin_teams[i].team_2 === team_nr) {
                    team = robin_teams[i];
                    team_index = i;
                    break;
                }
            }
        }

        return {
            team: team,
            team_index: team_index,
        };
    }

    getNoOpponentIndex(robin_teams, round, team_nr) {
        let team_index = "";

        for(let i = 0; i < robin_teams.length; i++) {
            if(robin_teams[i].round == round) {
                //console.log(robin_teams[i].team_1, robin_teams[i].team_2);
                if((robin_teams[i].team_1 === "" || robin_teams[i].team_2 === "") && (robin_teams[i].team_1 === team_nr || robin_teams[i].team_2 === team_nr)) {
                    team_index = i;
                    break;
                }
            }
        }

        return team_index;
    }

    generateRoundRobinOdd(num_teams) {
        let n2 = ((num_teams - 1) / 2);
        let results = [];
        let teams = [];

        for (let i = 0; i < num_teams; i++) {
            teams[i] = i;
        }

        // Start the rounds.
        for (let round = 0; round < num_teams; round++) {

            for (let i = 0; i < n2; i++) {
                let team1 = teams[n2 - i];
                let team2 = teams[n2 + i + 1];
                results.push({
                    round: round,
                    team_1: team1,
                    team_2: team2,
                });
            }

            // Set the team with the bye.
            results.push({
                round: round,
                team_1: teams[0],
                team_2: '',
            });

            // Rotate the array.
            teams = this.rotateArray(teams);
        }

        return results;
    }

    rotateArray(teams) {
        let moved_team = teams.shift();
        teams.push(moved_team);

        return teams;
    }

    getFreeForAll(playing_teams) {
        let round_robin = this.generateRoundRobin(playing_teams.length);
        this.assignTeamsToMatches(round_robin, playing_teams);

        return {
            type: this.tournament_type,
            teams: playing_teams,
            matches: round_robin
        };
    }

    getFull(playing_teams) {
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

    assignTeamsToMatches(matches, teams) {
        for(let i = 0; i < matches.length; i++) {
            matches[i].team_1 = teams[matches[i].team_1];
            matches[i].team_2 = teams[matches[i].team_2];
        }
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
                }
            }
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
