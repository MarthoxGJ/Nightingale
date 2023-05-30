import pandas as pd


# Parse a csv using pandas and print the table
def parse_csv(filename, folder=""):
    table = pd.read_csv(filename)
    for i in range(len(table)):
        # Gets column with name "song_id"
        data = []
        song_id = table["song_id"][i]
        for column in table.columns:
            # Check if value is not nan
            if column != "song_id" and not pd.isnull(table[column][i]):
                data.append(table[column][i])
        create_csv_per_song(song_id, data, folder, filename)
    return table


def create_csv_per_song(song_id, data, folder, original_filename):
    # Append the original filename to the song_id
    song_id_with_filename = (
        f"{song_id}_{original_filename.split('/')[-1].split('.')[0]}"
    )
    # Create csv file per song
    with open(folder + song_id_with_filename + ".csv", "w") as f:
        for val in data:
            f.write(str(val) + "\n")


parse_csv("./assets/valence.csv", "./assets/valence/")
parse_csv("./assets/arousal.csv", "./assets/arousal/")
