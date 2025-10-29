import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://bgyutjxwynwyuovuvgsz.supabase.co/';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneXV0anh3eW53eXVvdnV2Z3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjkxMzEsImV4cCI6MjA3MzcwNTEzMX0.RLV-P0Bh4N1qewuNmXtHdx0p4AAWQ-C5XsP7o81kdps';

export const supabase = createClient(supabaseUrl, supabaseKey);


(async () => {
    const { error } = await supabase.from('veiculos').select('placa').limit(1);
    if (!error) {
        console.log('Conexão com o banco Supabase estabelecida com sucesso!');
    } else {
        console.error('Erro ao conectar ao banco Supabase:', error.message);
    }
})();