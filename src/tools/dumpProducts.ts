import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars from .env.local manually if needed, but since we run with ts-node and it might not pick it up automatically
// we depend on the environment having them.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function dump() {
    console.log('Fetching products...');

    const { data: fuxion, error: e1 } = await supabase
        .from('FuXion_Productos')
        .select('*')
        .eq('activo', true);

    const { data: gudd, error: e2 } = await supabase
        .from('producto')
        .select('*')
        .eq('estado', 'activo');

    if (e1 || e2) {
        console.error('Error:', e1 || e2);
        return;
    }

    const output = { fuxion, gudd };
    const filePath = path.join(process.cwd(), 'products_dump.json');
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
    console.log(`Dumped ${fuxion?.length} FuXion products and ${gudd?.length} Gudd products to ${filePath}`);
}

dump();
