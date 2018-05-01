import userMutations from './user_mutations'
import articleMutations from './article_mutations'
import commentMutations from './comment_mutations'
import tagMutaions from './tag_mutations'
export default {
  ...userMutations,
  ...articleMutations,
  ...commentMutations,
  ...tagMutaions
}
//生有生，大道自有微，死无死，何用百年算；掩筝罢弦听渊默，苍茫天地何解莲
