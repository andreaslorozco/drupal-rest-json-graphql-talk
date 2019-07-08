<?php

namespace Drupal\graphql_mutations\Plugin\GraphQL\Mutations;

use Drupal\graphql\Annotation\GraphQLMutation;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\CreateEntityBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Simple mutation for creating a new article node.
 *
 * @GraphQLMutation(
 *   id = "create_signature",
 *   entity_type = "node",
 *   entity_bundle = "signature",
 *   secure = true,
 *   name = "createSignature",
 *   type = "EntityCrudOutput!",
 *   arguments = {
 *     "input" = "SignatureInput"
 *   }
 * )
 */
class CreateSignature extends CreateEntityBase
{
  /**
   * {@inheritdoc}
   */
  protected function extractEntityInput(
    $value,
    array $args,
    ResolveContext $context,
    ResolveInfo $info
  ) {
    return [
      'title' => $args['input']['title'],
      'field_message' => $args['input']['field_message'],
      'field_posted_through' => $args['input']['field_posted_through'],
    ];
  }
}
