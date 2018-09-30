class Tournament {
    static TYPE_FREE_FOR_ALL = 0;
    static TYPE_FULL = 1;

    static getTournamentTypes() {
        return [
            {
                id: this.TYPE_FREE_FOR_ALL,
                name: "Všetci proti všetkým"
            },
            {
                id: this.TYPE_FULL,
                name: "Skupiny + pavúk"
            }
        ]
    }
}

export default Tournament;