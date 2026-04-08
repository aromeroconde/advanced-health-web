const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://advsupabaseadv.vpsubuntu.advancedhealth.com.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE1MDUwODAwLAogICJleHAiOiAxODcyODE3MjAwCn0.PfipuRD4G1q2wBDr_Wk398aKdmM2VEFR8528tMfoyjI';

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
