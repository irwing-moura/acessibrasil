// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl = 'https://zseasfjpnyiheybqnjjq.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZWFzZmpwbnlpaGV5YnFuampxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NDQ1ODksImV4cCI6MjA0NjQyMDU4OX0.H4nT-L-UG363GzmgZaCNlgRs9LK0bBorG6BWbs0cGm0';
//
// //PROD - RECUPERA URL E CHAVE DO SUPABASE NO VERCEL DECLARADAS NAS VARIAVEIS DE AMBIENTE DO VERCEL
// // const supabaseUrl = process.env.SUPABASE_URL;
// // const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
//
//
// const supabase = createClient(supabaseUrl, supabaseKey)
//
// export const fetchContainersWithContent = async () => {
//     const {data, error} = await supabase
//         .from("containers")
//         .select(`
//     id,
//     title,
//     order,
//     funcionalidades (
//       id,
//       title,
//       type,
//       action,
//       icon,
//       tooltip,
//       group,
//       order,
//       buttons(id, name, description)
//     )
//   `).order('order', {foreignTable: 'funcionalidades'});
//
//     if(error) {
//         console.log('error', error);
//         return [];
//     }else {
//         console.log('success', data);
//         return data;
//     }
//
// }
//
// export const fetchButtons = async () => {
//     const {data, error} = await supabase
//         .from('buttons')
//         .select()
//         .order('id', {ascending: true});
//     if(error) {
//         console.log('error', error);
//         return [];
//     }else {
//         console.log('success', data);
//         return data;
//     }
// }
//
// export const fetchQueries = async () => {
//     const {data, error} = await supabase
//         .from('queries')
//         .select('*');
//     if(error) {
//         console.log('error', error);
//         return [];
//     }else {
//         console.log('success', data);
//         return data;
//     }
// }
//

// export const fetchContainers = async () => {
//     const {data, error} = await supabase
//         .from('containers')
//         .select()
//         .order('order', {ascending: true});
//     if(error) {
//         console.log('error', error);
//         return [];
//     }else {
//         console.log('success', data);
//         return data;
//     }
// }

// export const fetchContent = async (container_id) => {
//     const {data, error} = await supabase
//         .from('content')
//         .select()
//         .eq('container_id', container_id )
//         .order('order', { ascending: true })
//     if(error) {
//         console.log('error', error);
//         return [];
//     }else {
//         console.log('success', data);
//         return data;
//     }
// }
//
// export const insertContent = async (container_id, title, type, action, icon,
//                                     tooltip, group, order) => {
//     const { data, error } = await supabase
//         .from('content')
//         .insert({
//             container_id: container_id,
//             title: title,
//             type: type,
//             action: action,
//             icon: icon,
//             tooltip: tooltip,
//             group: group,
//             order: order
//         });
//     if(error) {
//         console.log(error);
//     }else {
//         console.log(data);
//     }
// }


