<?php

namespace Drupal\graphql_mutations\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * The input type for article mutations.
 *
 * @GraphQLInputType(
 *   id = "signature_input",
 *   name = "SignatureInput",
 *   fields = {
 *     "title" = "String",
 *     "field_message" = {
 *        "type" = "String",
 *        "nullable" = "TRUE"
 *     },
 *     "field_posted_through" = {
 *        "type" = "String",
 *        "nullable" = "TRUE"
 *     },
 *   }
 * )
 */
class SignatureInput extends InputTypePluginBase
{ }
