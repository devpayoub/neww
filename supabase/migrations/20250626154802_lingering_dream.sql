/*
  # Blog System Database Schema

  1. New Tables
    - `categories`
      - `id` (integer, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `authors`
      - `id` (integer, primary key)
      - `name` (text)
      - `avatar` (text)
      - `role` (text)
      - `bio` (text, optional)
      - `created_at` (timestamp)
    - `posts`
      - `id` (integer, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text)
      - `category_id` (integer, foreign key)
      - `author_id` (integer, foreign key)
      - `tags` (text)
      - `meta_title` (text, optional)
      - `meta_description` (text, optional)
      - `views` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Add policies for public read access to published content

  3. Sample Data
    - Insert default categories
    - Insert sample authors
    - Insert sample blog posts
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
  tags TEXT DEFAULT '',
  meta_title TEXT,
  meta_description TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories are manageable by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authors policies
CREATE POLICY "Authors are viewable by everyone"
  ON authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors are manageable by authenticated users"
  ON authors
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Posts are manageable by authenticated users"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name) VALUES
  ('SEO'),
  ('Marketing Digital'),
  ('Développement Web'),
  ('Design'),
  ('Réseaux Sociaux'),
  ('Formation')
ON CONFLICT (name) DO NOTHING;

-- Insert sample authors
INSERT INTO authors (name, avatar, role, bio) VALUES
  ('Marie Dupont', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 'Expert SEO', 'Experte en SEO et marketing digital avec plus de 10 ans d''expérience dans l''optimisation de sites web pour les moteurs de recherche.'),
  ('Sophie Martin', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', 'Directrice Marketing', 'Experte en stratégie de contenu et SEO avec plus de 8 ans d''expérience dans le marketing digital.'),
  ('Thomas Leroy', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', 'Lead Developer', 'Développeur full-stack passionné par les technologies web modernes et l''architecture logicielle.'),
  ('Emma Leclerc', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 'UI/UX Designer', 'Designer créative spécialisée dans la création d''expériences utilisateur intuitives et esthétiques.'),
  ('Lucas Bernard', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400', 'Social Media Manager', 'Expert en gestion de communauté et création de contenu engageant pour les réseaux sociaux.')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO posts (title, slug, excerpt, content, featured_image, category_id, author_id, tags, meta_title, meta_description) VALUES
  (
    '10 stratégies SEO incontournables pour améliorer votre classement en 2025',
    'strategies-seo-incontournables-2025',
    'Découvrez les dernières stratégies SEO qui vous permettront de propulser votre site web dans les premiers résultats de recherche et d''augmenter votre trafic organique.',
    '<p>Le référencement naturel (SEO) est en constante évolution, et il est essentiel de rester à jour avec les dernières tendances et stratégies pour maintenir et améliorer le classement de votre site web dans les moteurs de recherche.</p><h2>1. Optimisez votre contenu pour la recherche vocale</h2><p>Avec l''augmentation de l''utilisation des assistants vocaux comme Siri, Alexa et Google Assistant, l''optimisation pour la recherche vocale est devenue incontournable. Les requêtes vocales sont généralement plus longues et plus conversationnelles que les requêtes textuelles.</p><h2>2. Créez un contenu de qualité supérieure</h2><p>Le contenu reste roi en matière de SEO. Les moteurs de recherche privilégient le contenu approfondi, informatif et utile.</p>',
    'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
    1,
    1,
    'SEO, Marketing Digital, Référencement, Google, Stratégie Web',
    '10 stratégies SEO incontournables pour 2025',
    'Découvrez les meilleures stratégies SEO pour améliorer votre classement en 2025'
  ),
  (
    'Comment créer une stratégie de contenu efficace pour votre entreprise',
    'strategie-contenu-efficace-entreprise',
    'Apprenez à développer une stratégie de contenu qui engage votre audience et convertit les visiteurs en clients.',
    '<p>Une stratégie de contenu efficace est la clé du succès en marketing digital. Elle vous permet de créer du contenu qui résonne avec votre audience et génère des résultats concrets.</p><h2>Définir vos objectifs</h2><p>Avant de créer du contenu, il est essentiel de définir clairement vos objectifs. Que voulez-vous accomplir avec votre contenu ?</p>',
    'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
    2,
    2,
    'Content Marketing, Stratégie, Marketing Digital',
    'Stratégie de contenu efficace pour entreprise',
    'Guide complet pour créer une stratégie de contenu qui convertit'
  ),
  (
    'Les tendances UX/UI qui domineront en 2025',
    'tendances-ux-ui-2025',
    'Découvrez les dernières tendances en matière de design d''interface utilisateur et d''expérience utilisateur.',
    '<p>Le design UX/UI évolue constamment, et 2025 apporte son lot de nouvelles tendances passionnantes qui redéfiniront la façon dont nous interagissons avec les interfaces numériques.</p><h2>Design minimaliste et épuré</h2><p>La tendance vers la simplicité continue de dominer, avec des interfaces épurées qui mettent l''accent sur l''essentiel.</p>',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    4,
    4,
    'UX, UI, Design, Tendances, Interface',
    'Tendances UX/UI 2025',
    'Les dernières tendances en design UX/UI pour 2025'
  ),
  (
    'Comment optimiser votre site pour la recherche vocale',
    'optimiser-site-recherche-vocale',
    'La recherche vocale change la façon dont les utilisateurs trouvent du contenu. Voici comment adapter votre SEO.',
    '<p>La recherche vocale représente une révolution dans la façon dont les utilisateurs interagissent avec les moteurs de recherche. Il est crucial d''adapter votre stratégie SEO pour cette nouvelle réalité.</p><h2>Comprendre la recherche vocale</h2><p>Les requêtes vocales sont différentes des requêtes textuelles. Elles sont plus longues, plus conversationnelles et souvent formulées sous forme de questions.</p>',
    'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200',
    1,
    1,
    'SEO, Recherche Vocale, Optimisation, Google',
    'Optimiser son site pour la recherche vocale',
    'Guide complet pour optimiser votre site web pour la recherche vocale'
  ),
  (
    'Les frameworks JavaScript à surveiller en 2025',
    'frameworks-javascript-2025',
    'Un aperçu des frameworks JavaScript les plus prometteurs qui façonneront le développement web cette année.',
    '<p>Le paysage des frameworks JavaScript continue d''évoluer rapidement. Voici les frameworks qui méritent votre attention en 2025.</p><h2>Next.js 15</h2><p>Next.js continue de dominer le marché avec ses nouvelles fonctionnalités et améliorations de performance.</p><h2>Svelte et SvelteKit</h2><p>Svelte gagne en popularité grâce à sa simplicité et ses performances exceptionnelles.</p>',
    'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    3,
    3,
    'JavaScript, Frameworks, Développement Web, Next.js, React',
    'Frameworks JavaScript 2025',
    'Les meilleurs frameworks JavaScript à utiliser en 2025'
  ),
  (
    'Comment créer des campagnes publicitaires performantes sur TikTok',
    'campagnes-publicitaires-tiktok',
    'Tirez parti de la popularité de TikTok avec ces stratégies publicitaires éprouvées.',
    '<p>TikTok est devenu une plateforme incontournable pour les marques qui souhaitent toucher une audience jeune et engagée. Voici comment créer des campagnes publicitaires efficaces.</p><h2>Comprendre l''algorithme TikTok</h2><p>L''algorithme de TikTok favorise le contenu authentique et engageant. Il est important de créer du contenu qui résonne avec votre audience.</p>',
    'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=1200',
    5,
    5,
    'TikTok, Publicité, Réseaux Sociaux, Marketing',
    'Campagnes publicitaires TikTok performantes',
    'Guide pour créer des campagnes publicitaires efficaces sur TikTok'
  )
ON CONFLICT (slug) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();