-- Create games table
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  mode TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create game_players table
CREATE TABLE game_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create game_rounds table
CREATE TABLE game_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  round_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create player_answers table
CREATE TABLE player_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_round_id UUID REFERENCES game_rounds(id) ON DELETE CASCADE,
  player_id UUID REFERENCES game_players(id) ON DELETE CASCADE,
  answer INTEGER NOT NULL,
  time_elapsed NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_answers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create a game" ON games FOR INSERT WITH CHECK (true);
CREATE POLICY "Players can view their games" ON games FOR SELECT USING (true);
CREATE POLICY "Players can update their games" ON games FOR UPDATE USING (true);

CREATE POLICY "Players can join games" ON game_players FOR INSERT WITH CHECK (true);
CREATE POLICY "Players can view game players" ON game_players FOR SELECT USING (true);
CREATE POLICY "Players can update their scores" ON game_players FOR UPDATE USING (true);

CREATE POLICY "Game rounds are visible" ON game_rounds FOR SELECT USING (true);
CREATE POLICY "Players can add rounds" ON game_rounds FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can submit answers" ON player_answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Players can view answers" ON player_answers FOR SELECT USING (true);

-- Create functions
CREATE OR REPLACE FUNCTION update_game_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE games
  SET updated_at = NOW()
  WHERE id = NEW.game_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER on_game_player_insert
  AFTER INSERT ON game_players
  FOR EACH ROW
  EXECUTE FUNCTION update_game_status();

CREATE TRIGGER on_game_round_insert
  AFTER INSERT ON game_rounds
  FOR EACH ROW
  EXECUTE FUNCTION update_game_status();

CREATE TRIGGER on_player_answer_insert
  AFTER INSERT ON player_answers
  FOR EACH ROW
  EXECUTE FUNCTION update_game_status();